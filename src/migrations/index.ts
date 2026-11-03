import * as migration_20261025_183125_initial from './20261025_183125_initial';
import * as migration_20261026_100606_header_nav_dropdown from './20261026_100606_header_nav_dropdown';
import * as migration_20261026_111037_enquiry_language from './20261026_111037_enquiry_language';
import * as migration_20261026_121243_card_grid_photos from './20261026_121243_card_grid_photos';
import * as migration_20261026_121804_card_grid_flags from './20261026_121804_card_grid_flags';
import * as migration_20261029_133729_service_questions_in_form from './20261029_133729_service_questions_in_form';
import * as migration_20261029_133740_enquiry_answers from './20261029_133740_enquiry_answers';
import * as migration_20261029_134140_booking_form_note_default from './20261029_134140_booking_form_note_default';
import * as migration_20261030_230128_feature_groups_subheading from './20261030_230128_feature_groups_subheading';
import * as migration_20261102_110617_card_grid_with_photos from './20261102_110617_card_grid_with_photos';
import * as migration_20261102_134517_card_grid_closing_above from './20261102_134517_card_grid_closing_above';
import * as migration_20261102_144018_cta_light_style from './20261102_144018_cta_light_style';
import * as migration_20261102_161519_split_content_text_only from './20261102_161519_split_content_text_only';
import * as migration_20261102_163026_link_hide_arrow from './20261102_163026_link_hide_arrow';
import * as migration_20261103_160636_r2_storage from './20261103_160636_r2_storage';

export const migrations = [
  {
    up: migration_20261025_183125_initial.up,
    down: migration_20261025_183125_initial.down,
    name: '20261025_183125_initial',
  },
  {
    up: migration_20261026_100606_header_nav_dropdown.up,
    down: migration_20261026_100606_header_nav_dropdown.down,
    name: '20261026_100606_header_nav_dropdown',
  },
  {
    up: migration_20261026_111037_enquiry_language.up,
    down: migration_20261026_111037_enquiry_language.down,
    name: '20261026_111037_enquiry_language',
  },
  {
    up: migration_20261026_121243_card_grid_photos.up,
    down: migration_20261026_121243_card_grid_photos.down,
    name: '20261026_121243_card_grid_photos',
  },
  {
    up: migration_20261026_121804_card_grid_flags.up,
    down: migration_20261026_121804_card_grid_flags.down,
    name: '20261026_121804_card_grid_flags',
  },
  {
    up: migration_20261029_133729_service_questions_in_form.up,
    down: migration_20261029_133729_service_questions_in_form.down,
    name: '20261029_133729_service_questions_in_form',
  },
  {
    up: migration_20261029_133740_enquiry_answers.up,
    down: migration_20261029_133740_enquiry_answers.down,
    name: '20261029_133740_enquiry_answers',
  },
  {
    up: migration_20261029_134140_booking_form_note_default.up,
    down: migration_20261029_134140_booking_form_note_default.down,
    name: '20261029_134140_booking_form_note_default',
  },
  {
    up: migration_20261030_230128_feature_groups_subheading.up,
    down: migration_20261030_230128_feature_groups_subheading.down,
    name: '20261030_230128_feature_groups_subheading',
  },
  {
    up: migration_20261102_110617_card_grid_with_photos.up,
    down: migration_20261102_110617_card_grid_with_photos.down,
    name: '20261102_110617_card_grid_with_photos',
  },
  {
    up: migration_20261102_134517_card_grid_closing_above.up,
    down: migration_20261102_134517_card_grid_closing_above.down,
    name: '20261102_134517_card_grid_closing_above',
  },
  {
    up: migration_20261102_144018_cta_light_style.up,
    down: migration_20261102_144018_cta_light_style.down,
    name: '20261102_144018_cta_light_style',
  },
  {
    up: migration_20261102_161519_split_content_text_only.up,
    down: migration_20261102_161519_split_content_text_only.down,
    name: '20261102_161519_split_content_text_only',
  },
  {
    up: migration_20261102_163026_link_hide_arrow.up,
    down: migration_20261102_163026_link_hide_arrow.down,
    name: '20261102_163026_link_hide_arrow',
  },
  {
    up: migration_20261103_160636_r2_storage.up,
    down: migration_20261103_160636_r2_storage.down,
    name: '20261103_160636_r2_storage'
  },
];
