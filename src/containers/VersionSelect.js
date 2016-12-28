import React, {PureComponent, PropTypes} from 'react'
import VersionSelect from '../components/VersionSelect'
import {loadTags} from '../utils/github'

const lastVersionMap = {}

export default class VersionSelectContainer extends PureComponent {
  static propTypes = {
    repo: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    org: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      versions: ['loading…']
    }
  }

  componentWillMount() {
    const {repo, org} = this.props
    loadTags(repo, org).then((versions) => {
      versions.push('master')
      this.setState({versions})
      this.onChange({value: lastVersionMap[repo] || versions[0]})
    })
  }

  onChange = ({value}) => {
    const {repo, onChange} = this.props
    lastVersionMap[repo] = value
    this.setState({value})
    onChange({value})
  }

  render() {
    const {
      versions,
      value
    } = this.state

    return (
      <VersionSelect
        versions={versions}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}