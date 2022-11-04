/**@format */

export const AreaCodeCookieName = "local_storage_language";
export const AreaCodeStorageName = "language";

export enum AreaCode {
    unknown,
    // Afrikaans (South Africa)
    af_ZA = 1078,
    // Albanian (Albania)
    sq_AL = 1052,
    // Amharic (Amhara)
    am_AM = 1118,
    // Arabic (Algeria)
    ar_DZ = 5121,
    // Arabic (Bahrain)
    ar_BH = 15361,
    // Arabic (Egypt)
    ar_EG = 3073,
    // Arabic (Iraq)
    ar_IQ = 2049,
    // Arabic (Jordan)
    ar_JO = 11265,
    // Arabic (Kuwait)
    ar_KW = 13313,
    // Arabic (Lebanon)
    ar_LB = 12289,
    // Arabic (Libya)
    ar_LY = 4097,
    // Arabic (Morocco)
    ar_MA = 6145,
    // Arabic (Oman)
    ar_OM = 8193,
    // Arabic (Qatar)
    ar_QA = 16385,
    // Arabic (Saudi Arabia)
    ar_SA = 1025,
    // Arabic (Syria)
    ar_SY = 10241,
    // Arabic (Tunisia)
    ar_TN = 7169,
    // Arabic (United Arab Emirates)
    ar_AE = 14337,
    // Arabic (Yemen)
    ar_YE = 9217,
    // Armenian (Armenian)
    hy_AM = 1067,
    // Assamese (Assamese)
    as_AS = 1101,
    // Azeri (Cyrillic)
    az_AZ_Cyrl = 2092,
    // Azeri (Latin)
    az_AZ_Latn = 2093,
    // Segoe UI (Basque)
    eu_ES = 1069,
    // Belarusian (Belarus)
    be_BY = 1059,
    // Bulgarian (Bulgaria)
    bg_BG = 1026,
    // Catalan (Catala)
    ca_ES = 1027,
    // Chinese (HongKong)
    zh_HK = 3076,
    // Chinese (Macau SAR)
    zh_MO = 5124,
    // Chinese (Simplified)
    zh_CN = 2052,
    // Chinese (Singapore)
    zh_SG = 4100,
    // Chinese (Taiwan)
    zh_TW = 1028,
    // Croatian (Croatia)
    hr_HR = 1050,
    // Czech (Czech)
    cd_CZ = 1029,
    // Danish (Denmark)
    da_DK = 1030,
    // Netherlands (Belgium)
    nl_BE = 2067,
    // Netherlands (Netherlands)
    nl_NL = 1043,
    // English (Australia)
    en_AU = 3081,
    // English (Belize)
    en_BZ = 10249,
    // English (Canada)
    en_CA = 4105,
    // English (Caribbean)
    en_CB = 9225,
    // English (Ireland)
    en_IE = 6153,
    // English (India)
    en_IN = 16393,
    // English (Jamaica)
    en_JM = 8201,
    // English (New Zealand)
    en_NZ = 5129,
    // English (Phillippines)
    en_PH = 13321,
    // English (Southern Africa)
    en_ZA = 7177,
    // English (Trinidad)
    en_TT = 11273,
    // English (Zimbabwe)
    en_ZW = 12297,
    // English (United States)
    en_US = 1033,
    // English (United Kingdom)
    en_UK = 2057,
    // Estonian (Estonia)
    et_EE = 1061,
    // Faroese (Faeroes)
    fo_FO = 1080,
    // Finnish (Finland)
    fi_FI = 1035,
    // French (Belgium)
    fr_BE = 2060,
    // French (Canada)
    fr_CA = 11276,
    // French (France)
    fr_FR = 1036,
    // French (Luxembourg)
    fr_LU = 5132,
    // French (Monaco)
    fr_MC = 6156,
    // French (Switzerland)
    fr_CH = 4108,
    // Galician (Galicia)
    gl_ES = 1110,
    // German (Austria)
    de_AT = 3079,
    // German (Germany)
    de_DE = 1031,
    // German (Liechtenstein)
    de_LI = 5127,
    // German (Luxembourg)
    de_LU = 4103,
    // German (Switzerland)
    de_CH = 2055,
    // Gujarati (India)
    gu_IN = 1095,
    // Hebrew (Israel)
    he_IL = 1037,
    // North Indian (India)
    hi_IN = 1081,
    // Hungarian (Hungary)
    hu_HU = 1038,
    // Icelandic (Iceland)
    is_IS = 1039,
    // Indonesian (Indonesia)
    id_ID = 1057,
    // Italian (Italy)
    it_IT = 1040,
    // Italian (Switzerland)
    it_CH = 2064,
    // Japanese (Japan)
    ja_JP = 1041,
    // Kannada (India)
    kn_IN = 1099,
    // Kazakh (Kazakhstan)
    kk_KZ = 1087,
    // Korean (Korea)
    ko_KR = 1042,
    // Kyrgyz (Kazakhstan)
    ky_KZ = 1088,
    // Latvian (Latvian)
    lv_LV = 1062,
    // Lithuanian (Lithuania)
    lt_LT = 1063,
    // Malay (Brunei)
    ms_BN = 2110,
    // Malay (Malaysia)
    ms_MY = 1086,
    // Marathi (India)
    mr_IN = 1102,
    // Mongolian (Mongolia)
    mn_MN = 2128,
    // Norwegian (Bokml)
    nb_NO = 1044,
    // Norwegian (Nynorsk)
    nn_NO = 2068,
    // Polish (Polish)
    pl_PL = 1045,
    // Portuguese (Brazil)
    pt_BR = 1046,
    // Portuguese (Portugal)
    pt_PT = 2070,
    // Punjab (India)
    pa_IN = 1094,
    // Romanian (Moldova)
    ro_MO = 2072,
    // Romanian (Romania)
    ro_RO = 1048,
    // Russian (Russia)
    ru_RU = 1049,
    // Russian (Moldova)
    ru_MO = 2073,
    // Sanskrit (India)
    sa_IN = 1103,
    // Serbia (Serre - Cyrillic)
    sr_SP_Cyrl = 3098,
    // Serbia (Serre - Latin)
    sr_SP_Latn = 2074,
    // Slovak (Slovak)
    sk_SK = 1051,
    // Slovenia (Slovenia)
    sl_SI = 1060,
    // Spanish (Argentina)
    es_AR = 11274,
    // Spanish (Bolivia)
    es_BO = 16394,
    // Spanish (Chile)
    es_CL = 13322,
    // Spanish (Colombia)
    es_CO = 9226,
    // Spanish (Costa Rica)
    es_CR = 5130,
    // Spanish (Dominican Republic)
    es_DO = 7178,
    // Spanish (Ecuador)
    es_EC = 12298,
    // Spanish (Salvador)
    es_SV = 17418,
    // Spanish (Guatemala)
    es_GT = 4106,
    // Spanish (Honduras)
    es_HN = 18442,
    // Spanish (Mexico)
    es_MX = 2058,
    // Spanish (Nicaragua)
    es_NI = 19466,
    // Spanish (Panama)
    es_PA = 6154,
    // Spanish (Paraguay)
    es_PY = 15370,
    // Spanish (Peru)
    es_PE = 10250,
    // Spanish (Puerto Rico)
    es_PR = 20490,
    // Spanish (Spain Traditional)
    es_ES = 1034,
    // Spanish (Uruguay)
    es_UY = 14346,
    // Spanish (Venezuela)
    es_VE = 8202,
    // Swahili (Kenya)
    sw_KE = 1089,
    // Swedish (Finland)
    sv_FI = 2077,
    // Swedish (Sweden)
    sv_SE = 1053,
    // Tamil (India)
    ta_IN = 1097,
    // Tatar (Russia)
    tt_RU = 1092,
    // Telugu (India)
    te_IN = 1098,
    // Thai (Thailand)
    th_TH = 1054,
    // Turkish (Turkey)
    tr_TR = 1055,
    // Uzbek (Uzbekistan - Cyrillics)
    uz_UZ_Cyrl = 2115,
    // Uzbek (Uzbekistan - Latin)
    uz_UZ_Latn = 1091,
    // Vietnamese (Vietnam)
    vi_VN = 1066,
}

export function areaCodeToString(eArea: AreaCode): string {
    switch (eArea) {
        case AreaCode.af_ZA:
            return "af_ZA";
        case AreaCode.sq_AL:
            return "sq_AL";
        case AreaCode.am_AM:
            return "am_AM";
        case AreaCode.ar_DZ:
            return "ar_DZ";
        case AreaCode.ar_BH:
            return "ar_BH";
        case AreaCode.ar_EG:
            return "ar_EG";
        case AreaCode.ar_IQ:
            return "ar_IQ";
        case AreaCode.ar_JO:
            return "ar_JO";
        case AreaCode.ar_KW:
            return "ar_KW";
        case AreaCode.ar_LB:
            return "ar_LB";
        case AreaCode.ar_LY:
            return "ar_LY";
        case AreaCode.ar_MA:
            return "ar_MA";
        case AreaCode.ar_OM:
            return "ar_OM";
        case AreaCode.ar_QA:
            return "ar_QA";
        case AreaCode.ar_SA:
            return "ar_SA";
        case AreaCode.ar_SY:
            return "ar_SY";
        case AreaCode.ar_TN:
            return "ar_TN";
        case AreaCode.ar_AE:
            return "ar_AE";
        case AreaCode.ar_YE:
            return "ar_YE";
        case AreaCode.hy_AM:
            return "hy_AM";
        case AreaCode.as_AS:
            return "as_AS";
        case AreaCode.az_AZ_Cyrl:
            return "az_AZ_Cyrl";
        case AreaCode.az_AZ_Latn:
            return "az_AZ_Latn";
        case AreaCode.eu_ES:
            return "eu_ES";
        case AreaCode.be_BY:
            return "be_BY";
        case AreaCode.bg_BG:
            return "bg_BG";
        case AreaCode.ca_ES:
            return "ca_ES";
        case AreaCode.zh_HK:
            return "zh_HK";
        case AreaCode.zh_MO:
            return "zh_MO";
        case AreaCode.zh_CN:
            return "zh_CN";
        case AreaCode.zh_SG:
            return "zh_SG";
        case AreaCode.zh_TW:
            return "zh_TW";
        case AreaCode.hr_HR:
            return "hr_HR";
        case AreaCode.cd_CZ:
            return "cd_CZ";
        case AreaCode.da_DK:
            return "da_DK";
        case AreaCode.nl_BE:
            return "nl_BE";
        case AreaCode.nl_NL:
            return "nl_NL";
        case AreaCode.en_AU:
            return "en_AU";
        case AreaCode.en_BZ:
            return "en_BZ";
        case AreaCode.en_CA:
            return "en_CA";
        case AreaCode.en_CB:
            return "en_CB";
        case AreaCode.en_IE:
            return "en_IE";
        case AreaCode.en_IN:
            return "en_IN";
        case AreaCode.en_JM:
            return "en_JM";
        case AreaCode.en_NZ:
            return "en_NZ";
        case AreaCode.en_PH:
            return "en_PH";
        case AreaCode.en_ZA:
            return "en_ZA";
        case AreaCode.en_TT:
            return "en_TT";
        case AreaCode.en_ZW:
            return "en_ZW";
        case AreaCode.en_US:
            return "en_US";
        case AreaCode.en_UK:
            return "en_UK";
        case AreaCode.et_EE:
            return "et_EE";
        case AreaCode.fo_FO:
            return "fo_FO";
        case AreaCode.fi_FI:
            return "fi_FI";
        case AreaCode.fr_BE:
            return "fr_BE";
        case AreaCode.fr_CA:
            return "fr_CA";
        case AreaCode.fr_CH:
            return "fr_CH";
        case AreaCode.fr_FR:
            return "fr_FR";
        case AreaCode.fr_LU:
            return "fr_LU";
        case AreaCode.fr_MC:
            return "fr_MC";
        case AreaCode.gl_ES:
            return "gl_ES";
        case AreaCode.de_AT:
            return "de_AT";
        case AreaCode.de_CH:
            return "de_CH";
        case AreaCode.de_DE:
            return "de_DE";
        case AreaCode.de_LI:
            return "de_LI";
        case AreaCode.de_LU:
            return "de_LU";
        case AreaCode.gu_IN:
            return "gu_IN";
        case AreaCode.he_IL:
            return "he_IL";
        case AreaCode.hi_IN:
            return "hi_IN";
        case AreaCode.hu_HU:
            return "hu_HU";
        case AreaCode.is_IS:
            return "is_IS";
        case AreaCode.id_ID:
            return "id_ID";
        case AreaCode.it_CH:
            return "it_CH";
        case AreaCode.it_IT:
            return "it_IT";
        case AreaCode.ja_JP:
            return "ja_JP";
        case AreaCode.kn_IN:
            return "kn_IN";
        case AreaCode.kk_KZ:
            return "kk_KZ";
        case AreaCode.ko_KR:
            return "ko_KR";
        case AreaCode.ky_KZ:
            return "ky_KZ";
        case AreaCode.lv_LV:
            return "lv_LV";
        case AreaCode.lt_LT:
            return "lt_LT";
        case AreaCode.ms_BN:
            return "ms_BN";
        case AreaCode.ms_MY:
            return "ms_MY";
        case AreaCode.mr_IN:
            return "mr_IN";
        case AreaCode.mn_MN:
            return "mn_MN";
        case AreaCode.nb_NO:
            return "nb_NO";
        case AreaCode.nn_NO:
            return "nn_NO";
        case AreaCode.pl_PL:
            return "pl_PL";
        case AreaCode.pt_BR:
            return "pt_BR";
        case AreaCode.pt_PT:
            return "pt_PT";
        case AreaCode.pa_IN:
            return "pa_IN";
        case AreaCode.ro_MO:
            return "ro_MO";
        case AreaCode.ro_RO:
            return "ro_RO";
        case AreaCode.ru_MO:
            return "ru_MO";
        case AreaCode.ru_RU:
            return "ru_RU";
        case AreaCode.sa_IN:
            return "sa_IN";
        case AreaCode.sr_SP_Cyrl:
            return "sr_SP_Cyrl";
        case AreaCode.sr_SP_Latn:
            return "sr_SP_Latn";
        case AreaCode.sk_SK:
            return "sk_SK";
        case AreaCode.sl_SI:
            return "sl_SI";
        case AreaCode.es_AR:
            return "es_AR";
        case AreaCode.es_BO:
            return "es_BO";
        case AreaCode.es_CL:
            return "es_CL";
        case AreaCode.es_CO:
            return "es_CO";
        case AreaCode.es_CR:
            return "es_CR";
        case AreaCode.es_DO:
            return "es_DO";
        case AreaCode.es_EC:
            return "es_EC";
        case AreaCode.es_ES:
            return "es_ES";
        case AreaCode.es_GT:
            return "es_GT";
        case AreaCode.es_HN:
            return "es_HN";
        case AreaCode.es_MX:
            return "es_MX";
        case AreaCode.es_NI:
            return "es_NI";
        case AreaCode.es_PA:
            return "es_PA";
        case AreaCode.es_PE:
            return "es_PE";
        case AreaCode.es_PR:
            return "es_PR";
        case AreaCode.es_PY:
            return "es_PY";
        case AreaCode.es_SV:
            return "es_SV";
        case AreaCode.es_UY:
            return "es_UY";
        case AreaCode.es_VE:
            return "es_VE";
        case AreaCode.sw_KE:
            return "sw_KE";
        case AreaCode.sv_FI:
            return "sv_FI";
        case AreaCode.sv_SE:
            return "sv_SE";
        case AreaCode.ta_IN:
            return "ta_IN";
        case AreaCode.tt_RU:
            return "tt_RU";
        case AreaCode.te_IN:
            return "te_IN";
        case AreaCode.th_TH:
            return "th_TH";
        case AreaCode.tr_TR:
            return "tr_TR";
        case AreaCode.uz_UZ_Cyrl:
            return "uz_UZ_Cyrl";
        case AreaCode.uz_UZ_Latn:
            return "uz_UZ_Latn";
        case AreaCode.vi_VN:
            return "vi_VN";
        default:
            return "zh_CN";
    }
}

export function parseAreaString(areaStr?: string, forceArea?: boolean): AreaCode {
    const lowCase: string = areaStr?.toLowerCase() || "zh_cn";

    switch (lowCase) {
        case "af_za":
            return AreaCode.af_ZA;
        case "aq_al":
            return AreaCode.sq_AL;
        case "am_am":
            return AreaCode.am_AM;
        case "ar_dz":
            return AreaCode.ar_DZ;
        case "ar_bh":
            return AreaCode.ar_BH;
        case "ar_eg":
            return AreaCode.ar_EG;
        case "ar_iq":
            return AreaCode.ar_IQ;
        case "ar_jo":
            return AreaCode.ar_JO;
        case "ar_kw":
            return AreaCode.ar_KW;
        case "ar_jb":
            return AreaCode.ar_LB;
        case "ar_ly":
            return AreaCode.ar_LY;
        case "ar_ma":
            return AreaCode.ar_MA;
        case "ar_om":
            return AreaCode.ar_OM;
        case "ar_qa":
            return AreaCode.ar_QA;
        case "ar_sa":
            return AreaCode.ar_SA;
        case "ar_sy":
            return AreaCode.ar_SY;
        case "ar_tn":
            return AreaCode.ar_TN;
        case "ar_ae":
            return AreaCode.ar_AE;
        case "ar_ye":
            return AreaCode.ar_YE;
        case "hy_am":
            return AreaCode.hy_AM;
        case "as_as":
            return AreaCode.as_AS;
        case "az_az_cyrl":
            return AreaCode.az_AZ_Cyrl;
        case "az_az_latn":
            return AreaCode.az_AZ_Latn;
        case "eu_es":
            return AreaCode.eu_ES;
        case "be_by":
            return AreaCode.be_BY;
        case "bg_bg":
            return AreaCode.bg_BG;
        case "ca_es":
            return AreaCode.ca_ES;
        case "zh_hk":
            return AreaCode.zh_HK;
        case "zh_mo":
            return AreaCode.zh_MO;
        case "zh_cn":
            return AreaCode.zh_CN;
        case "zh_sg":
            return AreaCode.zh_SG;
        case "zh_tw":
            return AreaCode.zh_TW;
        case "hr_hr":
            return AreaCode.hr_HR;
        case "cd_cz":
            return AreaCode.cd_CZ;
        case "da_dk":
            return AreaCode.da_DK;
        case "nl_be":
            return AreaCode.nl_BE;
        case "nl_nl":
            return AreaCode.nl_NL;
        case "en_au":
            return AreaCode.en_AU;
        case "en_bz":
            return AreaCode.en_BZ;
        case "en_ca":
            return AreaCode.en_CA;
        case "en_cb":
            return AreaCode.en_CB;
        case "en_ie":
            return AreaCode.en_IE;
        case "en_in":
            return AreaCode.en_IN;
        case "en_jm":
            return AreaCode.en_JM;
        case "en_nz":
            return AreaCode.en_NZ;
        case "en_ph":
            return AreaCode.en_PH;
        case "en_za":
            return AreaCode.en_ZA;
        case "en_tt":
            return AreaCode.en_TT;
        case "en_zw":
            return AreaCode.en_ZW;
        case "en_us":
            return AreaCode.en_US;
        case "en_uk":
            return AreaCode.en_UK;
        case "et_ee":
            return AreaCode.et_EE;
        case "fo_fo":
            return AreaCode.fo_FO;
        case "fi_fi":
            return AreaCode.fi_FI;
        case "fr_be":
            return AreaCode.fr_BE;
        case "fr_ca":
            return AreaCode.fr_CA;
        case "fr_ch":
            return AreaCode.fr_CH;
        case "fr_fr":
            return AreaCode.fr_FR;
        case "fr_lu":
            return AreaCode.fr_LU;
        case "fr_mc":
            return AreaCode.fr_MC;
        case "gl_es":
            return AreaCode.gl_ES;
        case "de_at":
            return AreaCode.de_AT;
        case "de_ch":
            return AreaCode.de_CH;
        case "de_de":
            return AreaCode.de_DE;
        case "de_li":
            return AreaCode.de_LI;
        case "de_lu":
            return AreaCode.de_LU;
        case "gu_in":
            return AreaCode.gu_IN;
        case "he_il":
            return AreaCode.he_IL;
        case "hi_in":
            return AreaCode.hi_IN;
        case "hu_hu":
            return AreaCode.hu_HU;
        case "is_is":
            return AreaCode.is_IS;
        case "id_id":
            return AreaCode.id_ID;
        case "it_ch":
            return AreaCode.it_CH;
        case "it_it":
            return AreaCode.it_IT;
        case "ja_jp":
            return AreaCode.ja_JP;
        case "kn_in":
            return AreaCode.kn_IN;
        case "kk_kz":
            return AreaCode.kk_KZ;
        case "ko_kr":
            return AreaCode.ko_KR;
        case "ky_kz":
            return AreaCode.ky_KZ;
        case "lv_lv":
            return AreaCode.lv_LV;
        case "lt_lt":
            return AreaCode.lt_LT;
        case "ms_bn":
            return AreaCode.ms_BN;
        case "ms_my":
            return AreaCode.ms_MY;
        case "mr_in":
            return AreaCode.mr_IN;
        case "mn_mn":
            return AreaCode.mn_MN;
        case "nb_no":
            return AreaCode.nb_NO;
        case "nn_no":
            return AreaCode.nn_NO;
        case "pl_pl":
            return AreaCode.pl_PL;
        case "pt_br":
            return AreaCode.pt_BR;
        case "pt_pt":
            return AreaCode.pt_PT;
        case "pa_in":
            return AreaCode.pa_IN;
        case "ro_mo":
            return AreaCode.ro_MO;
        case "ro_ro":
            return AreaCode.ro_RO;
        case "ru_mo":
            return AreaCode.ru_MO;
        case "ru_ru":
            return AreaCode.ru_RU;
        case "sa_in":
            return AreaCode.sa_IN;
        case "sr_sp_cyrl":
            return AreaCode.sr_SP_Cyrl;
        case "sr_sp_latn":
            return AreaCode.sr_SP_Latn;
        case "sk_sk":
            return AreaCode.sk_SK;
        case "sl_si":
            return AreaCode.sl_SI;
        case "es_ar":
            return AreaCode.es_AR;
        case "es_bo":
            return AreaCode.es_BO;
        case "es_cl":
            return AreaCode.es_CL;
        case "es_co":
            return AreaCode.es_CO;
        case "es_cr":
            return AreaCode.es_CR;
        case "es_do":
            return AreaCode.es_DO;
        case "es_ec":
            return AreaCode.es_EC;
        case "es_es":
            return AreaCode.es_ES;
        case "es_gt":
            return AreaCode.es_GT;
        case "es_hn":
            return AreaCode.es_HN;
        case "es_mx":
            return AreaCode.es_MX;
        case "es_ni":
            return AreaCode.es_NI;
        case "es_pa":
            return AreaCode.es_PA;
        case "es_pe":
            return AreaCode.es_PE;
        case "es_pr":
            return AreaCode.es_PR;
        case "es_py":
            return AreaCode.es_PY;
        case "es_sv":
            return AreaCode.es_SV;
        case "es_uy":
            return AreaCode.es_UY;
        case "es_ve":
            return AreaCode.es_VE;
        case "sw_ke":
            return AreaCode.sw_KE;
        case "sv_fi":
            return AreaCode.sv_FI;
        case "sv_se":
            return AreaCode.sv_SE;
        case "ta_in":
            return AreaCode.ta_IN;
        case "tt_ru":
            return AreaCode.tt_RU;
        case "te_in":
            return AreaCode.te_IN;
        case "th_th":
            return AreaCode.th_TH;
        case "tr_tr":
            return AreaCode.tr_TR;
        case "us_uz_cyrl":
            return AreaCode.uz_UZ_Cyrl;
        case "us_uz_latn":
            return AreaCode.uz_UZ_Latn;
        case "vi_vn":
            return AreaCode.vi_VN;
        default:
            return forceArea ? AreaCode.unknown : AreaCode.zh_CN;
    }
}

export function getLocalArea(): AreaCode {
    const cookieArea = window.localStorage.getItem("language");
    const sLocalArea = cookieArea || navigator.language.replace("-", "_");

    return parseAreaString(sLocalArea);
}
