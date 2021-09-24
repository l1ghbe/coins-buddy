import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'



const Cryptocurrencies = ({simplified}) => {

    const count = simplified ? 10 : 100

    const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
    // const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // console.log(cryptos)

    useEffect(() => {
        
        // setCryptos(cryptosList?.data?.coins)
        const filteredData = cryptosList?.data.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    if (isFetching) return <Loader />

    return (
        <>
            {
                !simplified && (
                    <div className="search-crypto">
                        <Input placeholder="Search crypto" onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                )
            }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {
                    cryptos?.map(crypto => (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
                            <Link to={`/crypto/${crypto.id}`}>
                                <Card title={`${crypto.rank}. ${crypto.name}`} extra={<img alt="Crypto icon" className="crypto-image" src={crypto.iconUrl}/>} hoverable>
                                    <p>
                                        Price: <span style={{ fontWeight: 'bold' }}>{millify(crypto.price, { precision: 3 })}$</span>
                                    </p>
                                    <p>
                                        Market Cap: <span style={{ fontWeight: 'bold' }}>{millify(crypto.marketCap)}</span>
                                    </p>
                                    <p style={crypto.change < 0 ? {color: 'red'} : crypto.change > 3 ? {color: 'green'} : {color: 'black'}}>
                                        Daily Change: <span style={{fontWeight: 'bold'}}>{millify(crypto.change, { precision: 2 })}%</span>
                                    </p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Cryptocurrencies
