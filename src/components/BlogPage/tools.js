import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import { backendHost } from '../../api-config';
import headers from '../../api-fetch';
import Hyperlink from 'editorjs-hyperlink';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: `${backendHost}/article/uploadFile`, // Your backend file uploader endpoint
        byUrl: `${backendHost}/article/fetchUrl`, // Your endpoint that provides uploading by Url
      },
      // additionalRequestHeaders: headers // Pass your headers here
      additionalRequestHeaders: {
        Authorization: 'local@7KpRq3XvF9'
      }
    }
  },
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: 'CMD+L',
      target: '_blank',
      rel: 'nofollow',
      availableTargets: ['_blank', '_self', '_window'],
      availableRels: ['author', 'noreferrer'],
      validate: false,
      additionalRequestHeaders: headers // Pass your headers here
    }
  }
};
