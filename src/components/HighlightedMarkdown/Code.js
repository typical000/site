import React, {PureComponent, PropTypes} from 'react'
import {highlightElement} from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-bash'

export default class Code extends PureComponent {
  static propTypes = {
    lang: PropTypes.string,
    text: PropTypes.string
  }

  componentDidMount() {
    const {lang, text} = this.props
    this.code.textContent = text
    if (lang) highlightElement(this.code)
  }

  onRef = (ref) => {
    this.code = ref
  }

  render() {
    const {lang} = this.props
    return <code ref={this.onRef} className={lang && `language-${lang}`} />
  }
}
