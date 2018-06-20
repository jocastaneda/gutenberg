/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, BlockPlaceholder } from '@wordpress/editor';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

export const name = 'core/half-media-media-area';
const ALLOWED_BLOCKS = [
	'core/image',
	'core/video',
	'core-embed/flickr',
	'core-embed/youtube',
	'core-embed/vimeo',
	'core-embed/videopress',
];

export const settings = {
	attributes: {},

	title: __( 'Media Area' ),

	parent: [ 'core/half-media' ],

	icon: 'format-image',

	category: 'common',

	edit: withSelect( ( select, { id } ) => {
		const { getBlockOrder } = select( 'core/editor' );
		const blocksInside = getBlockOrder( id );
		return {
			hasInnerBlocks: blocksInside && blocksInside.length > 0,
		};
	} )(
		( { id, hasInnerBlocks } ) => {
			return (
				<div className="half-media__media">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						templateLock={ hasInnerBlocks ? 'insert' : false }
					/>
					{ ! hasInnerBlocks && (
						<BlockPlaceholder
							rootUID={ id }
						/>
					) }
				</div>
			);
		}
	),

	save() {
		return <div className="half-media__media"><InnerBlocks.Content /></div>;
	},
};
