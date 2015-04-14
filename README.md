# WRI Forest Atlas ArcGIS Online Template
> Template for the WRI Forest Atlas that will be available through ArcGIS Online.


## User Guide
<p>Add explanation of how to use when completed and in AGOL.</p>

## Requirements
<p>Add Requirements to run the app, including which ones in the configuration panel will be necessary to make the app work correctly.</p>

## Updating
<p>
		Note this was taken from the gab folder of the WRI Forest Atlas App. Due to the configuration of the app the path's need to be modified to make this work. If updates to the original WRI Forest Atlas App are made, copy over the index.htm from the gab folder and update all the paths necessary.  There are atleast four links with relative paths and items defined in the dojoConfig also use relative paths and need to be updated as well as the flagPath in the resources/Resource.js file.  The ToolsController.js also has several relative path's that need updating.  Try running <code>grep -nr --color '\.\.\/' ./ | cut -d: -f1 -f2</code> in terminal and updating all relative paths not in css files.  Will need to add some code later to handle this better so there is no need for doing this manually.
</p>

### Future Updates
<ul>
	<li>Clean up code architecture so manual updates are not necessary.</li>
	<li>Unify the codebase with the WRI Forest Atlas to make maintaining these applications easier.</li>
	<li>Integrate templating so there is no need for multiple separate html files.</li>
</ul>