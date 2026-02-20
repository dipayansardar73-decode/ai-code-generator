import click
import requests
import sys

API_URL = "http://localhost:8000/api/generate"

@click.group()
def cli():
    """AI-Powered Code Generation Tool CLI."""
    pass

@cli.command("generate")
@click.argument("prompt", type=str)
@click.option("--split/--no-split", default=False, help="Split generated code into header and implementation files.")
@click.option("--comments/--no-comments", default=True, help="Include comments and documentation in the generated code.")
@click.option("--template", type=str, default=None, help="Template to use (e.g. 'class', 'singleton').")
def generate(prompt, split, comments, template):
    """Generate C++ code from a natural language prompt."""
    click.echo(f"Generating code for: '{prompt}'...")
    
    payload = {
        "prompt": prompt,
        "options": {
            "split_files": split,
            "with_comments": comments,
            "template_name": template
        }
    }
    
    try:
        # Mock payload for now, connect to actual server when running.
        # response = requests.post(API_URL, json=payload)
        # response.raise_for_status()
        # click.echo("Code generation successful. Writing to files...")
        click.echo("CLI skeleton is ready.")
    except Exception as e:
        click.echo(f"Error: {e}", err=True)
        sys.exit(1)

if __name__ == "__main__":
    cli()
