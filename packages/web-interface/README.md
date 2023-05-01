The fastest way to get started using Style Forge is to use the web interface to generate a theme. We have created a [publicly-available sample Figma file](https://www.figma.com/file/6bJzXzTDnsF49mwbNNSKpI/Style-Forge---Public-Example) for testing purposes, so feel free to check it out and use it to start generating themes today.

## Sample Figma File

The [sample Figma file](https://www.figma.com/file/6bJzXzTDnsF49mwbNNSKpI/Style-Forge---Public-Example) is a demonstration of what a Style Forge-compatible component library can look like. It includes:

- Color - a page that includes branded color tokens, which are parsed by Style Forge
- Typography - a page for typography tokens such as heading (h1, h2, etc) and paragraph styles. This page also includes an example of Figma-driven configuration for font fallback.
- Button - a sample component with several variants

All three of these will be parsed by Style Forge into a theme object.

## Web Interface Tutorial

You can access the web interface either by cloning the repository and running it locally, or by accessing our hosted version at http://style-forge.monster.com.

### Running Locally

First, clone the Style Forge repo to your local machine.

Next, run the following commands in this order:

```
yarn
npx lerna run build
cd packages/web-interface
yarn start
```

1. `yarn` - this will install all the dependencies needed. If you don't have yarn installed locally, run `npm i -g yarn` to install yarn first.
2. `npx lerna run build` - lerna is our monorepo manager, and the "run build" command will build all packages at once, as well as create symlinks between any dependent packages.
3. `cd packages/web-interface` - navigate to the web interface package, which is where the relevant scripts are located
4. `yarn start` - this command runs the web interface and gets it started. You can also run `yarn dev` which launches the app in dev mode, which is slower but has hot reloading.

Once you are running locally, the interface will be available at `http://localhost:3000/`

### Using the Web Interface

#### Personal Access Token

<img alt="Style Forge personal access token entry screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-token.png" width="500" />

The first screen of the Web Interface is where you enter your Figma Personal Access Token. Even though our sample file is publicly available, Figma requires a Token for API access. This is where you can supply your token. If you do not have a token, you will need to register a Figma account (you can make one for free) and then [get your Personal Access Token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).

This Token is stored in localStorage, so you should only need to set it once every so often.

Once you have your Token, enter it in the box and click Submit Token.

#### Figma File Entry

<img alt="Style Forge figma file url entry screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-figma-url.png" width="500" />

The next screen requires you to enter a Figma file URL, the URL of the file you want to parse. You can use the [sample file URL](https://www.figma.com/file/6bJzXzTDnsF49mwbNNSKpI/Style-Forge---Public-Example) if you don't have a Figma library yet (most new users won't have this yet, so use our file).

Enter the full file URL and press "I'm ready to forge" to continue.

#### Forging Styles

<img alt="Style Forge user interface screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-ui.png" width="500" />

Once all the configuration is done, the real interface is displayed. We have two panels, which we call the Editor and the Viewer.

##### Editor Panel

<img alt="Style Forge editor panel screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-editor.png" width="150" />

The Editor Panel is the main configuration editor for the Web Interface. This is where the file can be changed, branches can be selected, and more.

**To change the file being parsed:**

- Click the name of the current file
- The Editor displays a new panel
- Paste the new Figma URL into the textbox
- Click "Add new file"

This panel also shows some recently viewed files for quick swapping

**To change the branch being parsed:**

By default, the parser will look at the main file. To parse a Figma branch instead:

- Click on "Main" under "Baseline Branch"
- The Editor displays a new panel
- Click the branch name you want to switch to

##### Data Type

There are three types of data types you can use to request data:

- Theme - this is the default selection and parses tokens/components/variants into a single JSON theme file
- Icons - parses SVG libraries to provide a branded Icon Library from Figma
- Figma API - returns the raw data that the Figma API provides - this is a developer tool for debugging purposes, and will often be an overwhelming amount of data at first.

#### Commands

You can run several commands in the Web Interface.

##### Forge Theme

<img alt="Style Forge parsed theme screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-theme.png" width="500" />

This command will return a JSON file based on the data type you have set. So this would display a theme JSON or Icon JSON object in the Viewer.

##### Forge Schema

<img alt="Style Forge parsed schema screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-schema.png" width="500" />

Essentially a debugging tool, this command will display the raw JSON schema of your theme. This is useful for quickly validating changes, as it flattens the structure greatly and shows all options on a single line instead of the more granular theme.

This makes it easy to identify improperly structured components, for example a variant might be in the wrong node, or be missing.

##### View Metadata

<img alt="Style Forge parsed metadata screen" src="https://www.monster.com/ux-static/g/content/style-forge/images/tutorial-metadata.png" width="500" />

Style Forge allows for Figma-driven configuration for the parser to use, such as fallback font stacks. However, we quickly realized it can be difficult for developers debugging the system to actually _find_ the configuration sometimes, as it could be anywhere in the Figma file.

This command is a debugging tool designed to display all configuration options and other metadata located in Figma, so developers don't need to manually hunt it down in Figma files.
