import "../scss/main.scss";
import "./pages/global";
import "./pages/home";
import "./pages/header";
import "./pages/catalog";
import "./pages/empty-search";
import "./pages/login";

import "./components/mobilemenu";
import "./components/filter";
import "./components/product";
import "./components/minicart";
import "./components/account";
import "./components/searchMob";
import "./components/send-form";
import "./components/searchForm";
import "./components/simulateShipping";
$(document).ready(function() {
	$(".#header-form").searchform({ vtexStore: "usefrates" });
});
