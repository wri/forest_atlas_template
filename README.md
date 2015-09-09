# WRI Forest Atlas ArcGIS Online Template
> Template for the WRI Forest Atlas that will be available through ArcGIS Online.

## Notes about the different configuration panels

Defaults for the configuration panels can be set in the bottom of the configuration panel json, however those values don't seem to be reliably passed down through the application ID until the user interacts with the panel in ArcGIS Online.  To be safe, add your defaults to the `Resources.js` file.  Whatever values are blank, missing, or empty from the configuration panel will be filled in with the defaults from `Resources.js`.

1. configurationPanel
	* This is the original configuration panel, it has all the options available in it.
2. countryConfigurationPanel
	* This is a simpler version of above, make sure to fill in your defaults in `Resources.js`.
3. simpleConfigurationPanel
	* This is the simplest version of the config panel, it only allows for one language to be used in the application.  In the `Resources.js` file you need to make sure you set the `useAdditionalLanguage` property to false as the current setting is true and this setting is not controlled from this configuration panel.
4. standardConfigurationPanel
	* This is currently the same as the simpleConfigurationPanel but may change, use the simpleConfigurationPanel until this configuration is approved and finalized.

## User Guide
<p>Add explanation of how to use when completed and in AGOL.</p>

## Requirements
<p>Add Requirements to run the app, including which ones in the configuration panel will be necessary to make the app work correctly.</p>

### Future Updates
* Add documentation
