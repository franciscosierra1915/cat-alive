import styled, {css} from 'styled-components';
import { colors } from './global.js'

export const Searchbar = styled.div`
  position: relative;
  margin: 0 24px;
  img {
    position: absolute;
    top: 50%;
    left: 600px;
    transform: translateY(-50%);
    z-index: 9;
    width: 16px;
    height: 16px;
  }
`