import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalDelete = (props) =>
{
    return (
        <>

            <Modal show={ props.show } onHide={ props.close }>

                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete user: { props.dataModal.email }</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ props.close }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ props.confirmDeleteUser }>
                        Confirm delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;