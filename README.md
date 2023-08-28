# README #

Seed project for creating discord bots.
Structure:
* **src** - Bot source code
  * **clientEventHandlers** - Discord client event handler classes
  * **commands** - Main bot functionality
* **test** - Test assets

### Setup ###

* Node 16+
* Create dev and prod bots at: https://discord.com/developers/applications/
  * Copy the `template.env` file and rename `.env`. Fill in with own credentials.

### Compile ###

* Compile once: `npm run compile`
* Compile continuously: `npm run ts:watch`

### Running the Bot for local development ###

* For continuous, active development: `npm run dev`