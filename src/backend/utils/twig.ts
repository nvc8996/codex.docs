/**
 * Twig extensions
 */
import twig from 'twig';
import fs from 'fs';
import urlify from './urlify';

export default (function () {
  'use strict';

  /**
   * Function for include svg on page
   *
   * @example svg('path/from/root/dir')
   * @param {string} filename - name of icon
   * @returns {string} - svg code
   */
  twig.extendFunction('svg', function (filename: string) {
    return fs.readFileSync(`./src/frontend/svg/${filename}.svg`, 'utf-8');
  });

  /**
   * Convert text to URL-like string
   * Example: "What is <mark>clean data</mark>" -> "what-is-clean-data"
   *
   * @param {string} string - source string with HTML
   * @returns {string} alias-like string
   */
  twig.extendFilter('urlify', function (string: string) {
    return urlify(string);
  });

  /**
   * Parse link as URL object
   *
   * @param {string} linkUrl - link to be processed
   * @returns {string} url — url data
   */
  twig.extendFunction('parseLink', function (linkUrl: string): string {
    try {
      return new URL(linkUrl).toString();
    } catch (e) {
      console.log(e);

      return '';
    }
  });
}());
