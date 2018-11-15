import styled from 'styled-components';

const Divider = styled.div`
  height: 0px;
  border: 1px solid ${({ theme }) => (theme.color.greyLight)};
  width: 100%;
`;

export default Divider;
