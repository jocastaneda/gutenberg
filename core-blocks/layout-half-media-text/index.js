/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

export const name = 'core/half-media';

export const settings = {
	title: __( 'Half Media' ),

	icon: 'columns',

	category: 'layout',

	attributes: {
	},

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit() {
		return (
			<div className="half-media">
				<InnerBlocks
					template={ [
						[ 'core/half-media-media-area' ],
						[ 'core/half-media-content-area' ],
					] }
					templateLock="all"
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="half-media">
				<InnerBlocks.Content />
			</div>
		);
	},
};
