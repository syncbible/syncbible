// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { settingsChange } from '../../actions';
import VersionSelect from '../version-select';
import styles from './styles.scss';
import { getStore, loadStore } from '../../app';

// set up global - to be deleted
javascripture.state = {};

const SettingsTray = () => {
	const dispatch = useDispatch();
	const settings = useSelector( state => state.settings );
	const reference = useSelector( state => state.reference );

 	// remove this line
	javascripture.state.settings = settings;

	const changeSetting = ( event ) => {
		dispatch( settingsChange( event.target.name, event.target.value ) );
		event.target.blur();
	};

	const changeCheckboxSetting = ( event ) => {
		dispatch( settingsChange( event.target.name, event.target.checked ) );
		event.target.blur();
	};

	return (
		<div id="settingsPanel" className={ styles.helpPanel }>
			<div className="content">
				<div className="content-padding">
					<form>
						<ul>
							<li className={ styles.settingsLi }>
								<label>Fonts:</label>
								<select value={ settings.fontFamily } name="fontFamily" onChange={ changeSetting }>
									<option value='-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", Arial, Helvetica, sans-serif !important;'>System</option>
									<option value="'Bookman Old Style' !important">Bookman</option>
									<option value="'Courier New', Courier !important">Courier</option>
									<option value="Georgia !important">Georgia</option>
									<option value="'Lucida Sans Unicode', 'Lucida Grande' !important">Lucida</option>
									<option value="'Times New Roman', Times !important">Times</option>
									<option value="Verdana, Geneva !important">Verdana</option>
								</select>
							</li>
							<li className={ styles.settingsLi }>
								<label>Font size:</label>
								<select value={ settings.fontSize } name="fontSize" onChange={ changeSetting }>
									<option value="80%">80%</option>
									<option value="90%">90%</option>
									<option value="100%">100%</option>
									<option value="110%">110%</option>
									<option value="120%">120%</option>
									<option value="130%">130%</option>
									<option value="140%">140%</option>
									<option value="150%">150%</option>
									<option value="160%">160%</option>
									<option value="170%">170%</option>
									<option value="180%">180%</option>
									<option value="190%">190%</option>
									<option value="200%">200%</option>
								</select>
							</li>
							<li className={ styles.settingsLi }>
								<label>Colours:</label>
								<select value={ settings.subdue } name="subdue" onChange={ changeSetting }>
									<option value="90%">Very Bright</option>
									<option value="75%">Bright</option>
									<option value="50%">Normal</option>
									<option value="30%">Dark</option>
									<option value="20%">Very Dark</option>
								</select>
							</li>
							<li className={ styles.settingsLi }>
								<label>Highlight words with:</label>
								<select value={ settings.highlightWordsWith } id="highlightWordsWith" name="highlightWordsWith" onChange={ changeSetting } >
									<option value="same">Same Strongs num</option>
									<option value="family">Same family</option>
								</select>
							</li>
							<li className={ styles.settingsLi }>
								<label>Target column:</label>
								<select value={ settings.targetColumn } id="targetColumn" name="targetColumn" onChange={ changeSetting } >
									{ reference.map( ( singleReference, key ) => {
										return <option value={ key } key={ key }>{ key + 1 }</option>
									} ) }
								</select>
							</li>

							<li className={ styles.settingsLi }>
								<label>
									<input type="checkbox" name="expandedSearchResults" checked={ settings.expandedSearchResults } onChange={ changeCheckboxSetting } /> Show expanded search results
								</label>
							</li>
							<li className={ styles.settingsLi }>
								<label>
									<input type="checkbox" name="darkMode" checked={ settings.darkMode } onChange={ changeCheckboxSetting } /> Dark Mode
								</label>
							</li>
							<li className={ styles.settingsLi }>
								<label>
									<input type="checkbox" name="compareMode" checked={ settings.compareMode } onChange={ changeCheckboxSetting } /> Compare Mode
								</label>
							</li>
							<li className={ styles.settingsLi }>
								<label>
									<input type="checkbox" name="highlightSearchResults" checked={ settings.highlightSearchResults } onChange={ changeCheckboxSetting } /> Highlight all words in a verse when hovering the search results
								</label>
							</li>
							<li className={ styles.settingsLi }>
								<label>Interface language:</label>
								<VersionSelect value={ settings.interfaceLanguage } name="interfaceLanguage" onChange={ changeSetting } />
							</li>
						</ul>
					</form>
					<button onClick={ async ()=>{
						const appState = await getStore();
						const element = document.createElement("a");
						const file = new Blob( [ JSON.stringify( appState ) ], {type: 'text/plain'});
						element.href = URL.createObjectURL(file);
						element.download = "sync-bible-settings.json";
						document.body.appendChild(element); // Required for this to work in FireFox
						element.click();
					}}>
						Download settings
					</button>
					<label className={ styles.uploadSettings }>
						Upload settings
						<input type="file" name="files" onChange={ ( event ) => {
							event.preventDefault();
							let files = event.target.files; // FileList object

							// use the 1st file from the list
							const settingsFile = files[0];

							let reader = new FileReader();

							// Closure to capture the file information.
							reader.onload = (function(theFile) {
								return async function(e) {
									await loadStore( e.target.result );
								};
							})( settingsFile );

							// Read in the image file as a data URL.
							reader.readAsText( settingsFile );
						}
						} />
					</label>
				</div>
			</div>
		</div>
	);
};

export default React.memo( SettingsTray );
