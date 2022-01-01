export const dataProducts = {
  id:0,
  name:'',
  price:0,
  status:'',
  images:'',
  detail_image:[]
}

export default function reducer(state, actions){

  switch(actions.type){
    case 'products':
      return {
        ...state,
        ...actions.data
      }
    case 'detail_products':
      return {
        ...state,
        ...actions.data
      }
    case 'cart_product':
      return {
        ...state,
        ...actions.data
      }
    default:
      return state;
  }
}
