import React, {useEffect,useState} from 'react'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import List from './component/list'
import RoleList from './component/roleList'
import { Button, Tag, Space, Row, Col } from 'antd';
import {getTableList} from './service'
import {getAllAuthList} from '@/utils/utils'
import {GithubIssueItem} from './component/list'
const authList = getAllAuthList()
const Role = () => {
  const [checkedList, setCheckedList] = useState([])
  const [isShow, toggleShow] = useState(false)
  const [currentRow, setCurrentRow] = useState({})

  const clickRowItem = (row:GithubIssueItem) => {
    console.log(row)
    setCheckedList(row.auth)
  }
  const setAuth = (row) => {
    toggleShow(true)
    setCheckedList(row.auth)
  }

  return <PageContainer>
    <Row gutter={12}>
      <Col span={16}>
        <List setAuth={setAuth} setCurrentRow={setCurrentRow} clickRowItem={clickRowItem}  />
      </Col>
      <Col span={8}>
        {
          isShow && <RoleList currentRow={currentRow} authList={authList} defaultCheckedList={checkedList} />
        }
      </Col>
    </Row>
      
    </PageContainer>
}

export default Role