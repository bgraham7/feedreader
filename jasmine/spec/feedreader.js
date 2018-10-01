/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('all have urls', function() {
            for(let feedId = 0; feedId < allFeeds.length; feedId++) {
                expect(allFeeds[feedId].url).toBeTruthy();            
            }
        });

        it('all have names', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeTruthy();            
            }
        });
    });

    describe('The menu', function() {
        it('is hidden by default', function() {
            const isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(true);
        });

        it('toggles visibility on click', function() {
            const menuButton = $('.menu-icon-link');
            const body = $('body');
            menuButton.click();
            let isHidden = body.hasClass('menu-hidden');
            expect(isHidden).toBe(false);
            menuButton.click();
            isHidden = body.hasClass('menu-hidden');
            expect(isHidden).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loadFeed populates at least one item', function(done) {
            const isHidden = $('body').hasClass('menu-hidden');
            const entires = $(".feed").find(".entry");
            expect(entires.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /*
        Load once, grab the first element to compare, load again to ensure reload is successful
        */
        let firstText;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstText = $(".feed").find("h2").html();
                loadFeed(1, function() { 
                    done();
                });
                
            });
        });

        it('new feed is loaded by loadFeed function', function(done) {
            const secondText = $(".feed").find("h2").html();
            console.log(firstText);
            console.log(secondText);
            const reloaded = firstText !== secondText;
            expect(reloaded).toBe(true);
            done();
        });
    });
}());
