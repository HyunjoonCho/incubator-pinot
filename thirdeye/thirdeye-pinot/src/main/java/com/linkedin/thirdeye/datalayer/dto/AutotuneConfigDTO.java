/**
 * Copyright (C) 2014-2018 LinkedIn Corp. (pinot-core@linkedin.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.linkedin.thirdeye.datalayer.dto;

import com.linkedin.thirdeye.datalayer.pojo.AutotuneConfigBean;
import com.linkedin.thirdeye.detector.email.filter.AlertFilter;
import com.linkedin.thirdeye.detector.email.filter.BaseAlertFilter;
import com.linkedin.thirdeye.detector.email.filter.DummyAlertFilter;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Auto Tune Configuration DTO. Given Alert filter, add alert filter setting to autotune config properties
 * When autotune being triggered, autotuneConfig will be passed to tuning steps
 */
public class AutotuneConfigDTO extends AutotuneConfigBean {
  private static final Logger LOGGER = LoggerFactory.getLogger(AutotuneConfigDTO.class);
  private AlertFilter alertFilter = new DummyAlertFilter(); // current alert filter
  private Properties tuningProps = new Properties(); // runtime tuning properties

  public AutotuneConfigDTO() {

  }

  // set current alert filter for comparison;
  // populate alert filter to autotune configuration as tuning properties
  public AutotuneConfigDTO(BaseAlertFilter alertFilter){
    this.alertFilter = alertFilter;
    this.tuningProps = alertFilter.toProperties();
  }

  public AutotuneConfigDTO(Properties properties) {
    setTuningProps(properties);
  }


  public void setAlertFilter(AlertFilter alertFilter) {
    this.alertFilter = alertFilter;
  }

  public void initAlertFilter(BaseAlertFilter baseAlertFilter) {
    this.alertFilter = baseAlertFilter;
    this.tuningProps = baseAlertFilter.toProperties();
  }


  public AlertFilter getAlertFilter() {
    return this.alertFilter;
  }

  public void setTuningProps(Properties tuningProps) {
    this.tuningProps = tuningProps;
  }

  public Properties getTuningProps() {
    return this.tuningProps;
  }

}