'use strict';

hexo.extend.filter.register('before_post_render', function(data){
  if (data.labels && !Array.isArray(data.labels)) {
    data.labels = [data.labels];
  }
  return data;
});