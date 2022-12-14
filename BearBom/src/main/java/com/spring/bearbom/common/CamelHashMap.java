package com.spring.bearbom.common;

import org.springframework.jdbc.support.JdbcUtils;

import java.util.HashMap;

@SuppressWarnings("serial")
public class CamelHashMap extends HashMap<String, Object> {
    @Override
    public Object put(String key, Object value) {
        return super.put(JdbcUtils.convertUnderscoreNameToPropertyName(key), value);
    }
}
