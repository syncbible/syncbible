import classnames from 'classnames';

export function rootClasses( darkMode ) {
	return classnames( 'root', { 'dark-mode-on': darkMode === true, 'dark-mode-off': darkMode === false } );
}
