
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { faList, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    
    const initInfo ={
        infoCard:[
            {
                name: 'Categories',
                datail: 'You can create categories, edit and delete',
                icon: faList,
                path:'/categories'
            },
            {
                name: 'Products',
                datail: 'You can create products, edit and delete',
                icon:  faLayerGroup,
                path:'/products'
            }
        ]
    }
        
    return (
        <div className='container'>
            <div className='grid grid-cols-12 py-3'>
                <h2>Dashboard</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {initInfo.infoCard.map((card, index )=>
                    <div key={index} className='rounded-md card'>
                        <div className='px-4 py-3'>
                            <div>
                                <h5><FontAwesomeIcon icon={card.icon} className='iconClass' size='lg' />{ ' ' + card.name}</h5>
                                <p>{card.datail}</p>
                            </div>
                            <Link to={card.path}><button className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-full rounded-full'>Go</button></Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;