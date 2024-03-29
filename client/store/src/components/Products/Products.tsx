import { useEffect, useState } from 'react'
import { basketProducts, getAllBasketProducts, getAllProducts } from '../../services/products';
import { Button, Rate, Tooltip } from 'antd';
import styles from './styles.module.css';
import { HeartFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addBasketProducts, allBasketProducts } from '../../redux/slices/basket';
import { favoritesProduct } from '../../services/favorites';

const userId = sessionStorage.getItem('userId');

type productsTypes = {
    id: number,
    category: string,
    description: string,
    image: string,
    price: string,
    rating: {
        rate: number,
        count: number
    },
    title: string,
    basketCount: number
}


const Products: React.FC = () => {

    const dispatch = useDispatch();
    
    const [products, setProducts] = useState<productsTypes[]>([]);

    const addBasket = async (data: productsTypes) => {
        const body = {
            userId: userId,
            products: [
                {
                    productId: data.id,
                    count: 0
                }
            ]
        }
        await basketProducts(body);
        dispatch(addBasketProducts(data));
    }

    const favorıProducts = async (data:productsTypes) => {
       const body = {
        userId:userId,
        favoritesProduct:[
            {
                productId: data.id
            }
        ]
       }
       await favoritesProduct(body);
    }

    useEffect(() => {
        const productsApi = async () => {
            const data = await getAllProducts();
            const newData = data.map((item: productsTypes) => ({ ...item, basketCount: 0 }));
            setProducts(newData);
        }
        productsApi();
    }, [])

    useEffect(() => {
        (async () => {
            const data = await getAllBasketProducts();
            dispatch(allBasketProducts(data));
        })()
    }, [dispatch])

    return (
        <div className={styles.products}>

            {
                products.map((data, key) => (

                    <div key={key} className={styles.card}>
                        <img src={data.image} alt={data.title} />
                        <div className={styles.product_info}>
                            <h2>{data.title}</h2>
                            <Tooltip placement="bottom" title={data.description}>
                                <p className={styles.products_description}>{data.description}</p>
                            </Tooltip>
                            <span>
                                <Rate allowHalf disabled defaultValue={data.rating.rate} />
                            </span>
                            <p className={styles.price}> {data.price} </p>
                            <div>
                                <Button onClick={() => addBasket(data)}>Add to Cart</Button>
                               <span onClick={()=>favorıProducts(data)}> <HeartFilled /></span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Products