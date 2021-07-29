import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';
import styled from 'styled-components';

const Card = styled.div`
  background: rgb(255 255 255 / 40%);
  -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  :hover {
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .card-icon {
    height: 5em;
  }
`;

export default function WeatherCard({ forecast }: any) {
  return (
    <Card className="rounded-3 py-4 px-4">
      <FontAwesomeIcon
        icon={forecast.condition !== null ? (forecast.condition as IconName) : 'circle'}
        className="card-icon w-auto mx-auto d-block pb-3"
      />
      <p className="text-center mb-3">{forecast.date}</p>
      <div className="d-flex justify-content-around mb-3">
        <span className="text-center">
          Min <br />
          {forecast.min + ' ºC'}
        </span>
        <span className="text-center">
          Max <br />
          {forecast.max + ' ºC'}
        </span>
      </div>
    </Card>
  );
}
