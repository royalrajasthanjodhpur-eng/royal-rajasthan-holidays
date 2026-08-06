/**
 * Central media library.
 * Replace any URL below with an uploaded brand asset (e.g. "/images/dubai.jpg")
 * once official destination photography is added to the /public folder.
 */

export const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const HERO_VIDEO = "https://videos.pexels.com/video-files/31454276/13413301_2732_1440_25fps.mp4";
export const HERO_VIDEO_ALT = "https://videos.pexels.com/video-files/31454302/13413475_2732_1440_25fps.mp4";
export const HERO_POSTER =
  "https://images.pexels.com/videos/31454276/4k-drone-video-4k-nature-video-4k-video-copyright-free-4k-video-nature-31454276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920";

export const IMG = {
  dubai1: px(19664340),
  dubai2: px(11645463),
  dubai3: px(36094289),
  dubai4: px(10358851),
  dubai5: px(7800781),

  vn1: px(13775441),
  vn2: px(34049817),
  vn3: px(37887592),
  vn4: px(32737711),
  vn5: px(34187772),
  vn6: px(32737714),

  sg1: px(35412465),
  sg2: px(37182535),
  sg3: px(18787358),
  sg4: px(6305534),
  sg5: px(38451400),
  sg6: px(38635117),

  bali1: px(35236021),
  bali2: px(34690741),
  bali3: px(10472242),
  bali4: px(36913571),
  bali5: px(34729526),

  mld1: px(36661715),
  mld2: px(2525898),
  th1: px(32004708),
  th2: px(32004714),
  th3: px(33209430),
  th4: px(8170275),

  raj1: px(29368152),
  raj2: px(5919573),
  raj3: px(19521546),
  raj4: px(19149591),
  raj5: px(19149607),
  raj6: px(15694515),

  him1: px(7170480),
  him2: px(37444676),
  him3: px(34998356),
  him4: px(2702627),
  him5: px(29093877),
  him6: px(29494215),

  ker1: px(12950219),
  ker2: px(36647370),
  ker3: px(38555084),
  ker4: px(10933045),
  ker5: px(35347815),
  ker6: px(35347836),

  tur1: px(15131582),
  tur2: px(15751798),
  egy1: px(15188105),
  tur3: px(29511482),
  tur4: px(30370450),
  tur5: px(10660429),

  bhu1: px(37845687),
  bhu2: px(19852887),
  bhu3: px(37845688),
  bhu4: px(7806281),
  np1: px(15302076),

  wl1: px(31055411),
  wl2: px(30889521),
  wl3: px(11760864),
  wl4: px(30889519),
  wl5: px(36785736),

  res1: px(12695275),
  res3: px(34790496),
  res4: px(6130051),
  res5: px(24807133),
  res6: px(9845436),

  ppl1: px(8972569),
  ppl2: px(8170306),
  ppl3: px(8972284),
  ppl4: px(38816812),
  ppl5: px(8806073),
  ppl6: px(9048742),

  cr1: px(12625284),
  cr2: px(16313842),
  cr3: px(20241698),
  cr4: px(5619979),
} as const;

export type ImageKey = keyof typeof IMG;
