import React, {useState} from "react";
import {Card, Divider, Form, Input, Row} from "antd";
import axios from "axios";
import {CopyButton} from "../../components/CopyButton";

export const GetBlockByHash = () => {
    const [blockByHash, setBlockByHash] = useState(null);

    const onChange = (event) => {
        try {
            tryRequest(event.target.value);
        } catch (error) {
            console.error(error);
        }
    }

    const tryRequest = (hash) => {
        setBlockByHash(null);
        try {
            if (hash) {
                axios.get(`https://vm.aleo.org/api/testnet3/block/${hash}`)
                    .then(response => setBlockByHash(JSON.stringify(response.data, null, 2)));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const layout = {labelCol: {span: 3}, wrapperCol: {span: 21}};

    const blockString = () => blockByHash !== null ? blockByHash.toString() : "";

    return <Card title="Get Block By Hash" style={{width: "100%", borderRadius: "20px"}} bordered={false}>
        <Form {...layout}>
            <Form.Item label="Block Hash" colon={false}>
                <Input name="hash" size="large" placeholder="Block Hash" allowClear onChange={onChange}
                       style={{borderRadius: '20px'}}/>
            </Form.Item>
        </Form>
        {
            (blockByHash !== null) ?
                <Form {...layout}>
                    <Divider/>
                    <Form.Item label="Block" colon={false}>
                        <Input.TextArea size="large" rows={15} placeholder="Block" value={blockString()} disabled/>
                    </Form.Item>
                    <Row justify="center">
                        <CopyButton data={blockString()}/>
                        <Divider/>
                    </Row>
                </Form>
                : null
        }
    </Card>
}