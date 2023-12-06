import { css, styled } from "styled-components";
import { Location } from "@/components/MatchFilter.type";
import { LOCATIONS } from "@/config/constants";

export type MatchFilterLocationsProps = {
  handleSelectLocation: (location: Location) => void;
  locationList: Location[] | null;
};

export default function MatchFilterLocations({
  handleSelectLocation,
  locationList,
}: MatchFilterLocationsProps) {
  return (
    <StyledContainer>
      <StyledInfo>
        <p>지역</p>
        <div>{!locationList ? "상관없음" : `${locationList.toString()}`}</div>
      </StyledInfo>
      <StyledLocationsContainer>
        {LOCATIONS.map((location, index) => (
          <StyledLocation
            key={"location" + index}
            onClick={() => handleSelectLocation(location)}
            $isChecked={locationList && locationList.includes(location)}
          >
            {location}
          </StyledLocation>
        ))}
      </StyledLocationsContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100px;
`;

const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;

  & > p {
    font-size: 22px;
  }

  & > div {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.point};
  }
`;

const StyledLocationsContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const StyledLocation = styled.div<{ $isChecked: boolean | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 4px;
  ${(props) =>
    props.$isChecked
      ? css`
          background-color: ${({ theme }) => theme.colors.point};
          color: white;
        `
      : css`
          background-color: white;
          color: ${({ theme }) => theme.colors.point};
        `}
  cursor: pointer;
`;
