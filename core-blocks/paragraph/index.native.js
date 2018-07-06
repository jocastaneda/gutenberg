import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PlainText } from '@wordpress/editor';
import { getPhrasingContentSchema } from '@wordpress/blocks';

import RCTAztecView from 'react-native-aztec';

export const name = 'core/paragraph';

const schema = {
	content: {
		type: 'array',
		source: 'children',
		selector: 'p',
		default: [],
	},
	align: {
		type: 'string',
	},
	dropCap: {
		type: 'boolean',
		default: false,
	},
	placeholder: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	fontSize: {
		type: 'string',
	},
	customFontSize: {
		type: 'number',
	},
};

const supports = {
	className: false,
};

const _minHeight = 50;


export const settings = {

	title: __( 'Paragraph' ),

	description: __( 'This is a simple text only block for adding a single paragraph of content.' ),

	icon: 'editor-paragraph',

	category: 'common',

	keywords: [ __( 'text' ) ],

	attributes: schema,

	transforms: {
	from: [
			{
				type: 'raw',
				// Paragraph is a fallback and should be matched last.
				priority: 20,
				selector: 'p',
				schema: {
					p: {
						// we should put 
						// children: getPhrasingContentSchema(),
						// here, but for some reason it's not working ok
						children: {
							strong: {},
							em: {},
							del: {},
							ins: {},
							a: { attributes: [ 'href' ] },
							code: {},
							abbr: { attributes: [ 'title' ] },
							sub: {},
							sup: {},
							br: {},
							'#text': {},
						}
					},
				},
			},
		],
	},
/*
	transforms: {
		from: [
			{
				type: 'raw',
				// Paragraph is a fallback and should be matched last.
				priority: 20,
				selector: 'p',
				schema: {
					p: {
						children: getPhrasingContentSchema(),
					},
				},
			},
		],
    },*/

	edit( { attributes, setAttributes, style } ) {
		if (attributes.aztecHeight == null) {
			attributes.aztecHeight = _minHeight;
		}
		//console.log(attributes);
		return (
			<RCTAztecView
				accessibilityLabel="aztec-view"
				style={ style, [ 
					{ minHeight: Math.max( _minHeight, attributes.aztecHeight ) },
				] }
				//text={ { text:attributes.content, eventCount: attributes.eventCount } }
				onContentSizeChange={ ( event ) => {
					setAttributes( {
						...attributes, 
						aztecHeight: event.nativeEvent.contentSize.height
					 }
					);
				} }
				onChange={ ( event ) => {
					setAttributes( {
						...attributes,
						content: event.nativeEvent.text,
						eventCount: event.nativeEvent.eventCount
					 } 
					) }
				}
				color={ 'black' }
				maxImagesWidth={ 200 }
			/>
		);
	},
	
	save( { attributes } ) {
		return <p>{attributes.content}</p>;
	},
};