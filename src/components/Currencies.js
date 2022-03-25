import React from "react";
import { Row, Col, Avatar } from "antd";

import { useGetCurrenciesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Currencies = () => {
    const { data, isFetching } = useGetCurrenciesQuery();
    const currenciesList = data?.data?.currencies;

    if (isFetching) return <Loader />;

    console.log(data);

    return (
        <>
            <Row className="currency-header">
                <Col span={5}>Icon</Col>
                <Col span={5}>Type</Col>
                <Col span={5}>Name</Col>
                <Col span={5}>Sign</Col>
                <Col span={4}>Symbol</Col>
            </Row>
            <Row>
                {currenciesList?.map((currency, id) => (
                    <Col span={24} key={id}>
                        <Row
                            style={{ width: "100%" }}
                            className="currency-card"
                        >
                            <Col span={5}>
                                <Avatar
                                    className="exchange-image"
                                    src={
                                        currency?.iconUrl !== null
                                            ? currency?.iconUrl
                                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                                    }
                                />
                            </Col>
                            <Col span={5}>{currency.type}</Col>
                            <Col span={5}>{currency.name}</Col>
                            <Col span={5}>{currency.sign}</Col>
                            <Col span={4}>{currency.symbol}</Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Currencies;
