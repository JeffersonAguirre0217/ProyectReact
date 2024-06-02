
import './dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className='container-fluid'>
            <div className='header mt-2'>
                <div className='row'>
                    <div className='col-12'> <h4>Dashboard</h4></div>
                </div>
            </div>

            <div className='row'>
                <div className='col-4'>
                    <Link to="/categories">
                        <div className='card m-1'>
                            <div className='mt-2'>
                                <label>Categories</label>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className='col-4'>
                    <Link to="/products">
                        <div className='card m-1'>
                            <div className='mt-2'>
                                <label>Products</label>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;