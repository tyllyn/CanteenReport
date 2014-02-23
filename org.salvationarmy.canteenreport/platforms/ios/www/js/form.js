var form = {
	initialize: function () {
		this.events();
	},
	events: function () {
		var f = this;
		$('.members-group').on('touchstart', '.js-add-member', function () {
			var next;

			next = $('.team-member').length + 1;

			f.addNewMember(next, '');

		})
		.on('touchstart', '.js-remove-member', function () {
			var $this = $(this);

			if ($('.team-member').length > 1) {

				// Remove current row
				$this.parents('.team-member').remove();

				// Renumber rows
				var i = 1;
				$('.team-member').each(function () {

					$(this)
						.removeClass()
						.addClass('input-group input-group-lg team-member team-member-' + i)
						.find('input')
							.attr('name', 'team-member-' + i)
							.attr('id', 'team-member-' + i);

					i += 1;

				});

			}

		});
	},
	addNewMember: function (id, val) {

		var $newmember;

		// Clone first member, strip all data, and append
		$newmember = $('.team-member-1')
			.clone()
			.removeClass('team-member-1')
			.addClass('team-member-' + id)
			.find('.js-add-member-container')
			.remove()
			.end()
			.find('input')
				.val(val)
				.attr('id', 'team-member-' + id)
				.attr('name', 'team-member-' + id)
				.end()
			.appendTo($('.members-group'));
	}
};
