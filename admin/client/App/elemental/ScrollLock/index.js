import { Component } from 'react';

export default class ScrollLock extends Component {
	constructor () {
		super();
		this.state = { lockCount: 0 }
	}
	componentWillMount () {
		if (typeof window === 'undefined') return;

		this.setState({
			lockCount: this.state.lockCount + 1
		})
		if (this.state.lockCount > 1) return;

		//	FIXME iOS ignores overflow on body
		try {
			const scrollBarWidth = window.innerWidth - document.body.clientWidth;

			const target = document.body;

			target.style.paddingRight = scrollBarWidth + 'px';
			target.style.overflowY = 'hidden';
		} catch (err) {
			console.error('Failed to find body element. Err:', err);
		}
	}
	componentWillUnmount () {
		// if (typeof window === 'undefined' || this.state.lockCount === 0) return;

		this.setState({
			lockCount: this.state.lockCount - 1
		})
		// if (this.state.lockCount > 0) return; // Still locked

		//	FIXME iOS ignores overflow on body
		try {
			const target = document.body;

			target.style.paddingRight = '';
			target.style.overflowY = '';

		} catch (err) {
			console.error('Failed to find body element. Err:', err);
		}
	}
	render () {
		return null;
	}
}
