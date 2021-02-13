import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToMarkdown from 'draftjs-to-markdown';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import './Editor.css';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const { profilesClient, uploadClient, uploadRequest } = require('./../proto/api_grpc_web_pb.js');
const upload = new uploadClient('https://upload.epicportfol.io');
const profiles = new profilesClient('https://profiles.epicportfol.io');
const { profileFromJson } = require('./../components/convertor.js');

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            var req = new uploadRequest();
            const reader = new FileReader();
            reader.onload = function () {
                req.setDataurl(reader.result)
                upload.upload(req, {}, function (err, response) {
                    console.log(err);
                    console.log(response)
                    resolve({ data: { link: response.getUrl() } })
                });
            }
            reader.readAsDataURL(file)
        }
    );
}

class ProfileEditor extends Component {
    constructor(props) {
        super(props);
        const html = props.profile.content;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    };
    updateUser(user) {
        const meta = { authorization: 'Bearer ' + localStorage.getItem('token') }
        // console.log("META: %o", meta)
        profiles.updateuser(profileFromJson(user), meta, function (err, response) {
            if (err != null) {
                console.log("UPDATE USER: %o", err);
            }
        });
    }
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
        this.props.profile.content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.updateUser(this.props.profile)
    };

    render() {
        const { editorState } = this.state;
        return (

            <div className="demo-root">
                <div className="demo-section">
                    <div className="demo-section-wrapper">
                        <div className="demo-editor-wrapper">
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                    image: {
                                        uploadCallback: uploadImageCallBack,
                                        previewImage: true,

                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditor;
