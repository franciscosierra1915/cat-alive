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

export const SearchOrg = styled.div`
  position: relative;
  margin-left: -500px;
  margin-top: 100px;
  margin-right: 15px;
  img {
    position: relative;
    top: 15px;
    left: 40px;
    transform: translateY(-50%);
    z-index: 9;
    width: 16px;
    height: 16px;
  }
`