
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './dashboard.css';
import { faList, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { LinkButton, PrimaryButton } from '../shared/styledComponent/styledButton';
import { CardGeneral, ContainerGeneral, ContainerTitle } from '../shared/styledComponent/styledContainer';
import { GridDashboard } from './styledDashbord';



function Dashboard() {
    const initInfo = {
        infoCard: [
            {
                name: 'Categories',
                datail: 'You can create categories, edit and delete',
                icon: faList,
                path: '/categories'
            },
            {
                name: 'Products',
                datail: 'You can create products, edit and delete',
                icon: faLayerGroup,
                path: '/products'
            }
        ]
    }

    return (
        <ContainerGeneral>
            <ContainerTitle>
                Dashboard
            </ContainerTitle>
            <GridDashboard>
                {initInfo.infoCard.map((card, index) =>
                    <CardGeneral>
                        <h5><FontAwesomeIcon icon={card.icon} size='lg' />{' ' + card.name}</h5>
                        <p>{card.datail}</p>
                        <LinkButton to={card.path}>Go</LinkButton>
                    </CardGeneral>
                )}
            </GridDashboard>
        </ContainerGeneral>
    );
}

export default Dashboard;