import React, {useRef, useState, useEffect} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {TinyEmitter} from 'tiny-emitter';

import QuillComposer from '../ComposerQuill';

import CreateToolbar from './create-toolbar';
import './styles.scss';

const MessageComposer = ({
  send,
  markdown,
  mentions,
  Toolbar,
  children,
  disabled,
  draft,
  setEmitter,
  notifyKeyDown,
  onMentionOpen,
  onMentionClose,
  onMentionFocus,
  placeholder,
  onError,
  keyBindings,
  sendButton,
}) => {
  const emitter = useRef(new TinyEmitter());
  const [active, setActive] = useState({});

  useEffect(() => {
    setEmitter(emitter.current);
  }, [emitter, setEmitter]);

  const containerClasses = classnames('message-composer-container', {disabled});

  const toolbarDom = <Toolbar emitter={emitter.current} active={active} disabled={disabled} />;

  return (
    <div className={containerClasses}>
      <div className="toolbar" id="toolbar">
        {toolbarDom}
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="composer">
        <QuillComposer
          send={send}
          markdown={markdown}
          mentions={mentions}
          disabled={disabled}
          draft={draft}
          emitter={emitter.current}
          active={setActive}
          notifyKeyDown={notifyKeyDown}
          onMentionOpen={onMentionOpen}
          onMentionClose={onMentionClose}
          onMentionFocus={onMentionFocus}
          placeholder={placeholder}
          onError={onError}
          keyBindings={keyBindings}
        />
        {sendButton}
      </div>
      <div className="children">{children}</div>
    </div>
  );
};

MessageComposer.displayName = 'MessageComposer';

MessageComposer.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  draft: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    save: PropTypes.func,
  }),
  keyBindings: PropTypes.object,
  markdown: PropTypes.shape({
    disabled: PropTypes.bool,
  }),
  mentions: PropTypes.shape({
    participants: PropTypes.object,
  }),
  notifyKeyDown: PropTypes.func,
  onMentionClose: PropTypes.func,
  onMentionFocus: PropTypes.func,
  onMentionOpen: PropTypes.func,
  onError: PropTypes.func,
  placeholder: PropTypes.string,
  send: PropTypes.func,
  sendButton: PropTypes.object,
  setEmitter: PropTypes.func,
  Toolbar: PropTypes.func,
};

MessageComposer.defaultProps = {
  children: undefined,
  disabled: false,
  draft: undefined,
  keyBindings: undefined,
  markdown: undefined,
  mentions: undefined,
  notifyKeyDown: null,
  onMentionClose: undefined,
  onMentionFocus: undefined,
  onMentionOpen: undefined,
  onError: undefined,
  placeholder: '',
  send: undefined,
  sendButton: undefined,
  setEmitter: () => {},
  Toolbar: CreateToolbar,
};

export default MessageComposer;
