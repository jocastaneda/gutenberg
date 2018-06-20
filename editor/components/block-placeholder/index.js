/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Inserter from '../inserter';

export class BlockPlaceholder extends Component {
	static getDerivedStateFromProps( { index, rootUID, layout } ) {
		return {
			insertionPoint: {
				index,
				rootUID,
				layout,
			},
		};
	}

	render() {
		const {
			className,
		} = this.props;
		return (
			<Placeholder
				instructions={ __( 'Press (+) to insert a media block.' ) }
				className={ classnames( 'editor-block-placeholder', className ) }
			>
				<Inserter
					insertionPoint={ this.state.insertionPoint }
					position="bottom right"
				/>
			</Placeholder>
		);
	}
}

export default BlockPlaceholder;
