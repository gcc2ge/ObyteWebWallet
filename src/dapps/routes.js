import registerDomainRoutes from './RegisterDomain/routes';
import domainSaleRoutes from './DomainSaleContainer/routes';
import p2pSportsBetting from './P2PSportsBetting/routes';
import blackbyteTrade from './BlackbyteTrade/routes';
import byteballStats from './ByteballStats/routes';
import byteballMarket from './ByteballMarket/routes';
import bbConvert from './BBConvert/routes';
import unstoppableData from './UnstoppableData/routes';
import whiteLittle from './WhiteLittle/routes';

const routes = {
  registerDomain: registerDomainRoutes,
  domainSale: domainSaleRoutes,
  p2pSportsBetting: p2pSportsBetting,

  blackbyteTrade: blackbyteTrade,
  byteballStats: byteballStats,
  byteballMarket: byteballMarket,
  bbConvert: bbConvert,
  unstoppableData: unstoppableData,
  whiteLittle: whiteLittle,
};

export default routes;
