# automated-tests

Welcome to the **automated-tests repository**! This framework has been designed from scratch to provide robust, efficient, and scalable solutions for automated testing using **Playwright**, **Cucumber** and **JavaScript**, with seamless integration through **CircleCI**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [.env Contents](#.envFile)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Project Structure](#project-structure)

## Overview

The **Automation Framework** is a scalable and customizable test automation solution built with **Playwright** and **JavaScript**. It supports end-to-end testing, regression testing, and integration testing, and is fully compatible with continuous integration pipelines via **CircleCI**. Designed to be user-friendly and maintainable, it provides a solid foundation for writing automated tests for the albert applications.

## Features

- **Cross-Browser Testing**: Supports testing across multiple browsers (Chrome, Firefox, Edge, Webkit).
- **Easy Integration**: Seamlessly integrates with **CircleCI** for continuous testing and delivery.
- **Flexible Test Management**: Organize and manage test cases with customizable configurations.
- **Comprehensive Reporting**: Generates detailed test reports and logs for easy debugging.
- **Modular Architecture**: Clean, modular code structure that promotes easy maintenance and scalability.
- **Support for BDD**: Utilize **Cucumber** for behavior-driven development (BDD) scenarios.

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **Playwright** (v1.x or higher)

### Installation

1. Clone the repository: 
    - git clone git@github.com:MoleculeEngineering/automated-tests.git
    - cd automated-tests
2. Run the command:
    - yarn

### Running Tests
1. To run the tests locally, execute the following command:
    - node --expose-gc ./node_modules/.bin/cucumber-js **Feature-File-Path**

### .env Contents

# General Settings
EXECUTION_ENVIRONMENT=dev
  # Possible values: development, staging, production
IS_CI=false  # Set to 'true' if running in a CI environment like CircleCI

# Browser Settings
BROWSER_TO_USE=chrome  # Browser to use for desktop mode: 'chrome', 'firefox', 'webkit', 'edge'
DEVICE_TO_EMULATE=  # Device to emulate; if empty or not found, runs in desktop mode. Examples: 'iPhone 13', 'iPad Pro 11'
HEADLESS_VIEWPORT=false  # Set to 'true' for headless mode; overrides in CI environments

# Device Settings
MOBILE_DEVICE=true  # If true, DEVICE_TO_EMULATE is required and browser is launched with the mobile device configuration

# Test Execution Settings
LIGHTHOUSE_VALIDATIONS=false  # Set to 'true' to enable Lighthouse performance validations
TENANT=TEN1  # Tenant identifier for login and other context

# Login Credentials (Sensitive Information)
LOGIN_USER=appstore@albertinvent.com  # Login email or username for the application

# AWS Credentials (Sensitive Information)
Please pick the AWS secret keys from https://albertinvent.awsapps.com/start/#/?tab=accounts

### CI/CD Integration
The repo is configured to run on Circle CI. Sample job details to be used are as mentioned below

    - execute_cucumber_tests:
        name: DEV Chrome Test Execution // Any meaningful name
        browser: "chrome" // The browser on which the tests have to run [chrome, webkit, firefox, edge]. The default is chrome
        context: dev // Will be dev or staging
        execution_environment: "dev" // Will be dev or staging
        lighthouse_validations: "false" // To run lighhouse tests to check for page performance. POC is WIP
        device: "Desktop Chrome" // Refer to deviceConfigurations.json for the list of devices to run the tests on

### Project Structure

└── src
    ├── data                          --------------> Contains data generator files used to create custom test data
    ├── features                      --------------> Parent directory for all feature files, with subfolders representing individual components
    │   ├── dataTemplates
    │   ├── inventory
    │   ├── maya
    │   ├── notebook
    │   ├── parameterGroups
    │   ├── projects
    │   ├── tasks
    │   ├── users
    │   ├── wip_tests                 --------------> Contains work-in-progress tests
    │   │   ├── multi_inventory
    │   │   ├── multi_work_flow
    │   │   └── resultsGrid
    │   └── worksheet
    │       ├── calculation
    │       ├── cellFormatting
    │       ├── intermediate_row_expansion
    │       ├── lookup_columns
    │       ├── lookup_rows
    │       ├── searchLoadTest
    │       ├── sheets
    │       └── text_wrapping
    ├── fixtures                      --------------> Holds static test data, mocks, or predefined data for tests
    ├── page_objects                  --------------> Contains page object models for all components of the framework
    │   ├── Common
    │   ├── Data_Template
    │   ├── Inventory
    │   │   └── modules               --------------> Sub-module for inventory-related functionalities
    │   ├── Notebook
    │   ├── Parameter_Groups
    │   ├── Projects
    │   ├── Reports
    │   ├── Task
    │   ├── Users_Teams_Roles
    │   └── Worksheet
    │       └── modules
    │           └── Sheets
    ├── step_definitions              --------------> Contains step definition files, organized by feature
    │   ├── common
    │   ├── dataTemplates
    │   ├── inventory
    │   ├── maya
    │   ├── notebook
    │   ├── parameterGroups
    │   ├── projects
    │   ├── tasks
    │   ├── users
    │   └── worksheet
    │       └── sheets
    ├── support                       --------------> Contains core framework logic, including hooks.js and world.js for environment setup
    └── utilities
        └── configurationFiles        --------------> Contains device configuration files with viewport details for running tests across various devices
    