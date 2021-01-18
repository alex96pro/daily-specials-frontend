import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DISTANCE } from '../../util/consts';
import { addToCart } from '../../common/actions/cart.actions';

export default function MealModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    const handleAddToCart = (data) => {
        dispatch(addToCart({amount:data.amount, description:data.description, mealId:props.meal.mealId, mealName:props.meal.mealName, price:props.meal.price, photo:props.meal.photo}));
        props.closeModal();
    };

    return (
        <div className="forgotten-password-modal">
            <div className="modal-overlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-x-container">
                    <button onClick={() => props.closeModal()} className="modal-x">x</button>
                </div>
                <div className="modal-header">
                    <div className="label-accent-color">
                        Meal: {props.meal.mealName}
                    </div>
                    <div className="label-accent-color">
                        Restaurant: {props.meal.restaurantName}
                    </div>
                    <div className="label-accent-color">
                        Location: {props.meal.location}
                    </div>
                    <div className="label-accent-color">
                        Distance: {props.meal.distance.toFixed(2)}{DISTANCE}
                    </div>
                </div>
                
                {props.meal.delivery ? 
                <div className="modal-body">
                    <form onSubmit={handleSubmit(handleAddToCart)}>
                        <div className="label-accent-color">Amount</div>
                        <input type="number" name="amount" defaultValue="1" ref={register({required:true, min:1})}/>
                        {errors.amount && <p className="message-danger">Amount is required</p>}
                        <div className="label-accent-color">Description (optional)</div>
                        <textarea name="description" ref={register()}/>
                        <button type="submit" className="button-long">Add to cart</button>
                    </form>
                </div>
                :
                <button className="button-long">Get directions</button>
                }
            </div>
        </div>
    );
};