import json
import os
import requests
from jsonschema import validate, ValidationError

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

CATALOG_PATH = os.path.join(SCRIPT_DIR, "../genesis-create-templates/catalog.json")
SCHEMA_PATH = os.path.join(SCRIPT_DIR, "../genesis-create-templates/schema.json")


def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def validate_schema(catalog, schema):
    try:
        validate(instance=catalog, schema=schema)
    except ValidationError as e:
        print(f"Schema validation error: {e.message}")
        exit(1)

def check_unique_names(catalog):
    names = [item['name'] for item in catalog]
    if len(names) != len(set(names)):
        print("Error: Duplicate names found in the catalog.")
        exit(1)

def check_repositories(catalog):
    for item in catalog:
        repo_url = item.get('repo')
        if not repo_url:
            print(f"Error: Missing 'repository' field in item {item}")
            exit(1)
        try:
            response = requests.get(f"https://github.com/{repo_url}")
            if response.status_code != 200:
                print(f"Error: Repository '{repo_url}' not retrievable.")
                exit(1)
        except requests.RequestException as e:
            print(f"Error: Failed to access repository '{repo_url}': {e}")
            exit(1)

def main():
    catalog = load_json(CATALOG_PATH)
    schema = load_json(SCHEMA_PATH)

    validate_schema(catalog, schema)

    check_unique_names(catalog)

    check_repositories(catalog)

    print("Validation passed.")

if __name__ == "__main__":
    main()