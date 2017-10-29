import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/*
	TODO: reactstrap is broken with react v16.0 - come back later
*/

export default ({ title, body, isOpen, onToggle }) => {
	return (
		<div>
			<Modal isOpen={isOpen} onClick={onToggle}>
				<ModalHeader toggle={onToggle}>{title}</ModalHeader>
				<ModalBody>{body}</ModalBody>
				<ModalFooter>
					<button className="btn btn-secondary" onClick={onToggle}>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
};
