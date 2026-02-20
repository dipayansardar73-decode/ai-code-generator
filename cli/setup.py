from setuptools import setup, find_packages

setup(
    name="codegen-cli",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "click>=8.1.7",
        "requests>=2.31.0",
        "rich>=13.6.0"
    ],
    entry_points={
        "console_scripts": [
            "codegen=codegen.cli:cli",
        ],
    },
)
