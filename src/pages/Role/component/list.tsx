import React, { Fragment, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import ProCard from '@ant-design/pro-card';
import { CheckboxValueType } from '_antd@4.14.1@antd/es/checkbox/Group';
import {getTableList, add, remove} from '../service'

const antIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />
export type GithubIssueItem = {
  url: string;
  id: number;
  name: string;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  auth: CheckboxValueType[]
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

type ListProps = {
  clickRowItem: (row: GithubIssueItem) => void
  setAuth: (row: GithubIssueItem) => void
  setCurrentRow: (row: GithubIssueItem) => void
  
}

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const List:React.FC<ListProps> = (props) => {
  const {clickRowItem, setAuth, setCurrentRow} = props
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  });

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '角色名称为必填项' }],
        };
      },
      width: '30%',
    },
    // {
    //   title: '状态',
    //   key: 'state',
    //   dataIndex: 'state',
    //   valueType: 'select',
    //   valueEnum: {
    //     all: { text: '全部', status: 'Default' },
    //     open: {
    //       text: '未解决',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: '已解决',
    //       status: 'Success',
    //     },
    //   },
    // },
    {
      title: '角色描述',
      dataIndex: 'decs',
      fieldProps: (from, { rowKey, rowIndex }) => {
        return {
          rules: [{ required: true, message: '角色描述为必填项' }],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="authable"
          onClick={() => {
            setCurrentRow(record)
            setAuth(record)
          }}
        >
          配置权限
        </a>,
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        // <Fragment>
        //   <Spin indicator={antIcon} key={record.id} />
        //   <a
        //     key={record.id}
        //     onClick={async () => {
        //       // await remove(record.id)
        //       setDataSource(dataSource.filter((item) => item.id !== record.id));
        //     }}
        //   >
        //     删除
        //   </a>
        // </Fragment>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="角色列表"
        maxLength={10}
        recordCreatorProps={
          {
            position: 'top',
            record: newRecord,
          }
        }
        columns={columns}
        request={(params) => getTableList(params)}
        value={dataSource}
        onRow={record => {
          return {
            onClick: () => {
              clickRowItem(record)
            }
          }
        }}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (_, row) => {
            const {name, desc} = row
            const params = {
              name, desc
            }
            await add(params)
            // await waitTime(2000);
            // setNewRecord({
            //   id: (Math.random() * 1000000).toFixed(0),
            // });
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProField
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
}
export default List
