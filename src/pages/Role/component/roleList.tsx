import { useEffect, useState } from 'react';
import { Checkbox, Divider, Row, Col, Card, Button } from 'antd';
import type { CheckboxChangeEvent } from '_antd@4.14.1@antd/lib/checkbox';
import type { CheckboxValueType } from '_antd@4.14.1@antd/es/checkbox/Group';
import { getAllAuthCode } from '@/utils/utils';
import { connect } from 'dva';
import { edit } from '../service';

const CheckboxGroup = Checkbox.Group;
type RoleListProps = {
  currentAllAuthList: { label: string; auth: string }[];
  currentRow: {};
};

const RoleList: React.FC<RoleListProps> = (props) => {
  console.log('render', props);
  const { currentRow, currentAllAuthList } = props;
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const allAuthCode = getAllAuthCode();
  useEffect(() => {
    if (currentRow.id) {
      // console.log('123in', currentRow)
      setCheckedList(currentRow.auth);
    }
  }, [currentRow.id]);
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < allAuthCode.length);
    setCheckAll(list.length === allAuthCode.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? allAuthCode : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const addRole = async () => {
    const params = {
      ...currentRow,
      auth: checkedList,
    };
    edit(params);
    console.log('checkedList---', currentRow);
  };
  return (
    <Card>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        全选
      </Checkbox>
      <Divider />
      <CheckboxGroup value={checkedList} onChange={onChange}>
        <Row>
          {currentAllAuthList.map((item) => (
            <Col span={24} key={item.auth}>
              <Checkbox value={item.auth}>{item.label}</Checkbox>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>
      <Row justify="end">
        <Button type="primary" onClick={addRole}>
          确定
        </Button>
      </Row>
    </Card>
  );
};

export default connect((state) => {
  console.log('state', state);
  return {
    currentAllAuthList: state.user.currentAllAuthList,
  };
})(RoleList);
