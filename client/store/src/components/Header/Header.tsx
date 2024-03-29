import type { MenuProps } from 'antd';
import { Dropdown, Badge, Space, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined, ShopOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';

type ProductsType = {
    id: number,
    category: string,
    description: string,
    image: string,
    price: string,
    rating: {
        rate: number,
        count: number
    },
    title: string
}
type BasketProductsType = {
    products : ProductsType[]
}

const Header: React.FC = () => {

    const dispatch = useDispatch();

    const [basketProducts, setBasketProducts] = useState<ProductsType[]>([]);
    
    const { products } = useSelector((state: { basket : BasketProductsType}) => state.basket);
    const { loading, isUser, status} = useSelector((state: { auth: AuthState }) => state.auth);
    
  
    
    const items: MenuProps['items'] = [
        {
            label:'Favorites',
            key:'0'
        },
        {
            label: 'Log Out',
            key: '1',
            onClick:()=> dispatch(logOut())
        },
    ];

    useEffect(() => {
      setBasketProducts(products);
    }, [products])

    useEffect(() => {
        console.log(loading, isUser, status);
    }, [isUser, loading, status])
    
    
    return (
        <header className='container fluid'>
            <div className={`${styles.header}`}>
                <span className={styles.header_icon} >
                <ShopOutlined /> <span>STORE</span>
                </span>

                <div className={styles.header_items}>

                <Link to='/basket'>
                    <span className={styles.header_item}>
                        <Space size="large">
                            <Badge count={products.length} size='small' >
                                <Avatar shape="square" size="large" >
                                    <ShoppingCartOutlined />
                                </Avatar>
                            </Badge>
                        </Space>
                    </span>
                    </Link>
                    <span className={styles.header_item}>
                        <Dropdown  menu={{ items }} trigger={['click']}>
                            <UserOutlined />
                        </Dropdown>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header