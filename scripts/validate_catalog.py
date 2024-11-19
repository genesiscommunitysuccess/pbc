import json
import os
import requests
from jsonschema import validate, ValidationError
from collections import Counter

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
    names_counter = Counter(names)
    duplicates = [name for name, count in  names_counter.items() if count > 1]

    if duplicates:
        print(f"Error: Duplicate names found in the catalog: {', '.join(duplicates)}")
        exit(1)

def check_repositories(catalog):
    failed_repos = []

    for item in catalog:
        repo_url = item.get('repo')
        if not repo_url:
            failed_repos.append(f"Missing 'repository' field in item {item}")
            continue
        try:
            response = requests.get(f"https://github.com/{repo_url}")
            if response.status_code != 200:
                failed_repos.append(f"Repository '{repo_url}' not retrievable.")
                continue

            genesis_create_json_location = item.get('fileLocation')
            if not genesis_create_json_location:
                genesis_create_json_location = ".genx/genesis.create.json"

            branch = item.get('branch')
            if not branch:
                branch = "master"
                
            genesis_create_json = requests.get(f"https://raw.githubusercontent.com/{repo_url}/refs/heads/{branch}/{genesis_create_json}")

            if not genesis_create_json:
                failed_repos.append(f"Failed to access Genesis Create Json in repository '{repo_url}'")

        except requests.RequestException as e:
            failed_repos.append(f"Failed to access repository '{repo_url}': {e}")
            continue

    if failed_repos:
        print("Error: the following repository checks failed:")
        for error in failed_repos:
            print(f" - {error}")
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