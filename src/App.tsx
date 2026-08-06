import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import About from "./pages/About";
import { Blog, BlogPost, Faq, Gallery, GuestStoriesPage } from "./pages/Content";
import DestinationDetail from "./pages/DestinationDetail";
import Destinations from "./pages/Destinations";
import { HolidayTypeDetail, HolidayTypesIndex } from "./pages/Holidays";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import { Contact, Legal, NotFound, Sitemap, ThankYou } from "./pages/Utility";

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/destinations" element={<Destinations scope="all" />} />
          <Route path="/destinations/international" element={<Destinations scope="international" />} />
          <Route path="/destinations/domestic" element={<Destinations scope="domestic" />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />

          <Route path="/holidays" element={<HolidayTypesIndex />} />
          <Route path="/holidays/:slug" element={<HolidayTypeDetail />} />

          <Route path="/visa" element={<ServicePage slug="visa" />} />
          <Route path="/hotels" element={<ServicePage slug="hotels" />} />
          <Route path="/flights" element={<ServicePage slug="flights" />} />
          <Route path="/cruises" element={<ServicePage slug="cruises" />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/guest-stories" element={<GuestStoriesPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/thank-you" element={<ThankYou />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
