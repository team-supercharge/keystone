import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import {
    GlyphButton,
    Modal,
    Button,
} from '../../../../elemental';


class LmcAvatarUpload extends React.Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.renderAvatarEditor = this.renderAvatarEditor.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.save = this.save.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.state = {
            scale: 1,
        };
    }

    handleDrop(dropped) {
        this.setState({ image: dropped[0] });
    }

    renderDropZoneActive() {
        return (
            <div className="dropzone-text dropzone__active">
                <p>
                    { DROP_ZONE_ACTIVE }
                </p>
            </div>
        )
    }

    renderDropZoneRejected() {
        return (
            <div className="dropzone-text dropzone__rejected">
                <p>
                    { DROP_ZONE_REJECTED }
                </p>
            </div>
        )
    }

    renderDropZoneInactive() {
        return (
            <div className="dropzone-text dropzone__inactive">
                <GlyphButton
                    color="success"
                    glyph="cloud-upload"
                    // onClick={() => this.exportPdf(logs, resident)}
                    position="left"
                    title={DROP_ZONE_BUTTON}
                >
                    { DROP_ZONE_BUTTON }
                </GlyphButton>
                <p>
                    { DROP_ZONE_INACTIVE }
                </p>
            </div>
        )
    }

    handleScale(e) {
        const scale = parseFloat(e.target.value);
        this.setState({ scale });
    }

    save(event) {
        // const img = this.editor.getImageScaledToCanvas().toDataURL();
        event.preventDefault();
        // this.setState({ imagePreview: img });
        // window.__img = this.editor.getImageScaledToCanvas();
        this.editor.getImageScaledToCanvas()
            .toBlob((blob) => {
                let file = new File(
                    [blob],
                    this.state.image.name.replace(/\..+$/, '.png'),
                    { type: 'image/png' }
                );

                this.props.onSave(file);
                console.log(file);
                this.toggleModal();
            });
    }

    renderAvatarEditor() {
        return (
            <div>
                <GlyphButton
					glyph="chevron-left"
					position="left"
					onClick={() => this.setState({ image: null, scale: 1 })}
                    variant="link"
                    style={{ paddingLeft: 0 }}
					>
					Back
				</GlyphButton>
                <div style={styles.imageContainer}>
                    <AvatarEditor
                        scale={parseFloat(this.state.scale)}
                        ref={editor => {
                            this.editor = editor;
                        }}
                        width={200}
                        height={200}
                        border={0}
                        borderRadius={125}
                        image={this.state.image} />

                    <div>
                        <input
                            name="scale"
                            type="range"
                            onChange={this.handleScale}
                            min="1"
                            max="4"
                            step="0.01"
                            style={styles.zoomInput}
                            defaultValue="1"
                        />
                        <br/>
                        <span style={styles.zoomLabel}>Zoom</span>
                    </div>
                </div>
            </div>
        )
    }

    toggleModal() {
        // reset state
        this.setState({
            image: null,
            scale: 1,
            isModalOpen: !this.state.isModalOpen,
        });
    }

    renderDropZone() {
        return (
            <Dropzone
                className="dropzone"
                accept=".png,.jpg,.jpeg"
                onDrop={this.handleDrop}
                multiple={false}
            >
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragActive) {
                        return this.renderDropZoneActive();
                    } else if (isDragReject) {
                        return this.renderDropZoneRejected();
                    } else {
                        return this.renderDropZoneInactive();
                    }
                }}
            </Dropzone>
        )
    }

    renderModal() {
        return (
            <Modal.Dialog
				isOpen={this.state.isModalOpen}
                onClose={this.toggleModal}
                backdropClosesModal
			>
				<Modal.Header
					text={ OPEN_MODAL_TEXT }
					showCloseButton
				/>
				<Modal.Body>
                    { this.state.image
                        ? this.renderAvatarEditor()
                        : this.renderDropZone()
                    }
				</Modal.Body>
				<Modal.Footer>
                    {this.state.image
                    && <Button color="success" type="submit" data-button-type="submit" onClick={this.save}>
                        { BUTTON_SAVE }
                    </Button>}
					<Button
						variant="link"
						color="cancel"
						data-button-type="cancel"
						onClick={this.toggleModal}
					>
						{ BUTTON_CANCEL }
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
        )
    }

    render () {
        return (
            <div style={styles.container}>
                <GlyphButton
                    color="default"
                    glyph="cloud-upload"
                    onClick={this.toggleModal}
                    position="left"
                    title={OPEN_MODAL_TEXT}
                >
                    { OPEN_MODAL_TEXT }
                </GlyphButton>
                { this.renderModal() }
            </div>
        );
    }
};

const DROP_ZONE_ACTIVE = 'Drop to upload';
const DROP_ZONE_INACTIVE = 'or drop your image here';
const DROP_ZONE_REJECTED = 'That\'s not a valid file type. Please try a PNG or JPG.';
const DROP_ZONE_BUTTON = 'Upload Image';
const OPEN_MODAL_TEXT = 'Set profile picture';
const BUTTON_SAVE = 'Upload';
const BUTTON_CANCEL = 'Cancel';

const styles = {
    container: {
        paddingLeft: 180,
        paddingBottom: 16,
    },
    imageContainer: {
        textAlign: 'center',
    },
    zoomInput: {
        width: 250,
    },
    zoomLabel: {
        textAlign: 'center',
    },
}

export default LmcAvatarUpload;
